"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("App:Mongoose-Service");
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOption = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 8000,
            useFindAndModify: false,
            useCreateIndex: true,
        };
        this.connectWithRetry = () => __awaiter(this, void 0, void 0, function* () {
            let dbUrl = process.env.MONGO_DOCKER_URI;
            log("Attempting MongoDB connection (will retry if needed)");
            mongoose_1.default.Promise = global.Promise;
            console.log(dbUrl);
            // console.log(acronym);
            yield mongoose_1.default
                .connect(dbUrl, this.mongooseOption)
                .then(() => {
                log("MongoDB Successfully connected");
            })
                .catch((err) => {
                const retrySeconds = 5;
                log(`MongoDB connection was Unsuccessful (will retry ${++this
                    .count} after ${retrySeconds} seconds)`, { Error: err, dbUrl });
                setTimeout(this.connectWithRetry, 5000);
            });
        });
        this.connectWithRetry();
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21tb24vc2VydmljZXMvbW9uZ29vc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFnQztBQUNoQyxrREFBMEI7QUFJMUIsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTNELE1BQU0sZUFBZTtJQVVuQjtRQVRRLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixtQkFBYyxHQUFHO1lBQ3ZCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsd0JBQXdCLEVBQUUsSUFBSTtZQUM5QixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7UUFTRixxQkFBZ0IsR0FBRyxHQUFTLEVBQUU7WUFDNUIsSUFBSSxLQUFLLEdBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztZQUU5QyxHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUM1RCxrQkFBUSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsd0JBQXdCO1lBQ3hCLE1BQU0sa0JBQVE7aUJBQ1gsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDO2lCQUNuQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNULEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDYixNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLEdBQUcsQ0FDRCxtREFBbUQsRUFBRSxJQUFJO3FCQUN0RCxLQUFLLFVBQVUsWUFBWSxXQUFXLEVBQ3pDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FDdEIsQ0FBQztnQkFDRixVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLENBQUM7UUEzQkEsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELFdBQVc7UUFDVCxPQUFPLGtCQUFRLENBQUM7SUFDbEIsQ0FBQztDQXdCRjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==