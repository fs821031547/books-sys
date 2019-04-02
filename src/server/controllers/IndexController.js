console.log("🍎");
import {
    route,
    GET
} from "awilix-koa";
@route("/")
class IndexController {
    constructor(){}
    @route("/")
    @GET()
    async actionIndex(ctx, next) {
        ctx.body = {
            data:"Hello Yideng"
        }
    }
}
export default IndexController;
