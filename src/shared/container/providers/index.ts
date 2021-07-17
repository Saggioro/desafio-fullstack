import { container } from "tsyringe";

import DatefnsProvider from "./DateProvider/implementations/DatefnsProvider";
import IDateProvider from "./DateProvider/models/IDateProvider";
import BCryptHashProvider from "./HashProvider/implementations/BCryptHashProvider";
import IHashProvider from "./HashProvider/models/IHashProvider";

container.registerSingleton<IDateProvider>("DatefnsProvider", DatefnsProvider);

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
