import React, {useEffect} from "react";
import {createConsola} from "consola";
import {LoggerContext} from "../context/LoggerContext";
import {type InputLogObject} from "consola";

type LoggerProviderProps = {
    envKeys?: {
        logLevel?: string;
    };
};

/**
 * Provides context for building browser console loggers.
 *
 * #### Environment Config ####
 *
 * | Name | Type | Description |
 * | --- | --- | --- |
 * | `logLevel` | `"TRACE"`, `"DEBUG"`, `"INFO"`, `"WARN"`, `"ERROR"`, `"SILENT"`, or `undefined`. | The log level for the application. |
 * 
 * ### Usage ###
 * 
 * ```bash
 * # Example environment configuration
 * 
 * VITE_LOG_LEVEL=DEBUG
 * ```
 * 
 * Wrap your application in this provider passing the `envKeys` prop to configure the logger:
 * 
 * ```tsx
 * // Example using LoggerProvider
 * 
 * <LoggerProvider envKeys={{ logLevel: "VITE_LOG_LEVEL" }}>
 *   <App />
 * </LoggerProvider>
 * ```
 *
 * To use the provider context, use the `useLoggerBuilder` hook.
 */
export const LoggerProvider: React.FC<React.PropsWithChildren<LoggerProviderProps>> = ({children, ...value}) => {

    const logLevelVar = import.meta.env[value?.envKeys?.logLevel || ""];

    const logLevel = {
        TRACE: 5,
        DEBUG: 4,
        INFO: 3,
        WARN: 1,
        ERROR: 0,
        SILENT: -999,
    };

    const consola = createConsola({
        level: logLevel[logLevelVar as keyof typeof logLevel] || logLevel.SILENT,
        formatOptions: {
            columns: 80,
            colors: true,
            compact: true,
            date: true,
        },
    });

    const builder = {
        build: (input: InputLogObject) => consola.withDefaults(input),
    };

    const logger = builder.build({ tag: LoggerProvider.name });

    useEffect(() => {
        logger.debug("Mounted");

        logger.trace({
            logLevel: logLevelVar,
        });

        return () => {
            logger.debug("Unmounted");
        };
    }, []);

    return (
        <LoggerContext.Provider value={builder}>
            {children}
        </LoggerContext.Provider>
    );

};
