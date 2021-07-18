import { isCPF } from "brazilian-values";

import IBrazilValuesProvider from "../models/IBrazilValuesProvider";

class BrazilianValuesProvider implements IBrazilValuesProvider {
    public validateCpf(payload: string): boolean {
        return isCPF(payload);
    }
}

export default BrazilianValuesProvider;
