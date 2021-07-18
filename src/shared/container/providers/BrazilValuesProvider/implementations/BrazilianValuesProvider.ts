import { isCEP, isCPF } from "brazilian-values";

import IBrazilValuesProvider from "../models/IBrazilValuesProvider";

class BrazilianValuesProvider implements IBrazilValuesProvider {
    public validateCpf(payload: string): boolean {
        return isCPF(payload);
    }
    public validateCep(payload: string): boolean {
        return isCEP(payload);
    }
}

export default BrazilianValuesProvider;
