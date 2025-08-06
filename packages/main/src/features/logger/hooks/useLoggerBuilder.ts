import {useContext} from "react";

import {LoggerContext} from "../context/LoggerContext";

export const useLoggerBuilder = () => useContext(LoggerContext);