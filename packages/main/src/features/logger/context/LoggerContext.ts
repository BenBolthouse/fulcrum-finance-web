import type {InputLogObject, ConsolaInstance} from "consola";

import {createContext} from "react";

type LoggerBuilder = {
    build: (input: InputLogObject) => ConsolaInstance;
};

export const LoggerContext = createContext<LoggerBuilder | undefined>(undefined);
