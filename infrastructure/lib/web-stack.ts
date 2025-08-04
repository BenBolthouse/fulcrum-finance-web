import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontorigins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';
import {Construct} from 'constructs';
import {CertificatesStack} from './certificates-stack';

export interface WebStackConfig {
    certificatesStack: CertificatesStack;
}

export class WebStack extends cdk.Stack {

    public readonly distribution: cloudfront.IDistribution;
    public readonly bucket: s3.IBucket;
    public readonly deployment: s3deployment.BucketDeployment;
    public readonly hostedZone: route53.IHostedZone;
    public readonly originAccessIdentity: cloudfront.IOriginAccessIdentity;
    public readonly aNameRecord: route53.ARecord;

    public constructor(scope: Construct, id: string, config: WebStackConfig, props?: cdk.StackProps) {
        super(scope, id, props);

        const environment = this.node.tryGetContext("@cforge/app-environment");

        if (!environment) {
            throw new Error("Environment context variable '@cforge/app-environment' is required.")
        }

        this.bucket = new s3.Bucket(this, 'Bucket', {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            publicReadAccess: false,
            autoDeleteObjects: true,
        });

        this.hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
            domainName: 'benbolt.house',
        });

        this.originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity');

        this.bucket.grantRead(this.originAccessIdentity);

        this.distribution = new cloudfront.Distribution(this, 'Distribution', {
            domainNames: [
                environment !== "prod"
                ? `fulcrum-finance.${environment}.benbolt.house`
                : "fulcrum-finance.benbolt.house",
            ],
            defaultRootObject: "index.html",
            defaultBehavior: {
                origin: new cloudfrontorigins.S3Origin(this.bucket, {
                    originAccessIdentity: this.originAccessIdentity,
                }),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            certificate: config.certificatesStack.fulcrumFinanceSiteCertificate,
            errorResponses: [
                {
                    httpStatus: 400,
                    responseHttpStatus: 200,
                    responsePagePath: "/index.html"
                },
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: "/index.html"
                },
            ]
        });

        this.aNameRecord = new route53.ARecord(this, 'AliasRecord', {
            zone: this.hostedZone,
            recordName: environment !== "prod"
                ? `fulcrum-finance.${environment}.benbolt.house.`
                : "fulcrum-finance.benbolt.house.",
            target: route53.RecordTarget.fromAlias(new route53targets.CloudFrontTarget(this.distribution)),
        });

        this.deployment = new s3deployment.BucketDeployment(this, 'Deployment', {
            sources: [s3deployment.Source.asset('../packages/main/build')],
            destinationBucket: this.bucket,
            distribution: this.distribution,
            distributionPaths: ['/*'],
        });
    }

}
