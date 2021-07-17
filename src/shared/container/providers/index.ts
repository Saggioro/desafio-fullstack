import { container } from "tsyringe";

import DatefnsProvider from "./DateProvider/implementations/DatefnsProvider";
import IDateProvider from "./DateProvider/models/IDateProvider";
import BCryptHashProvider from "./HashProvider/implementations/BCryptHashProvider";
import IHashProvider from "./HashProvider/models/IHashProvider";

container.registerSingleton<IDateProvider>("DateProvider", DatefnsProvider);

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
