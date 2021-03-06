import cheerio from "cheerio";
import {
    route,
    GET
} from "awilix-koa";
const {
    URLSearchParams
} = require("url");

@route("/books")
class BooksController {
    //aop
    constructor({
        indexService
    }) {
        //di
        this.indexService = indexService;
    }
    @route("/list")
    @GET()
    async actionIndex(ctx, next) {
        const result = await this.indexService.getData();
        const html = await ctx.render("books/pages/list", {
            data: result.data
        });
        if (ctx.request.header["x-pjax"]) {
            const $ = cheerio.load(html);
            ctx.body = $("#js-hooks-data").html()
        } else {
            ctx.body = html;
        }
    }
    @route("/add")
    @GET()
    async actionAdd(ctx, next) {
        const html = await ctx.render("books/pages/add");
        const $ = cheerio.load(html);
        if (ctx.request.header["x-pjax"]) {
            let _result = "";
            $(".pjaxcontent").each(function () {
                _result += $(this).html()
            })
            $(".layload-js").each(function () {
                _result += `<script src="${$(this).attr("src")}"></script>`;
            })
            // $(".layload-css").each(function () {
            //     _result += $(this).html()
            // })
            ctx.body = _result;
        } else {
            ctx.body = html;
        }
    }
    @route("/save")
    @GET()
    async actionSave(ctx, next) {
        const index = new Index();
        const params = new URLSearchParams();
        params.append("Books[name]", "测试");
        params.append("Books[author]", "测试111");
        const result = await index.saveData({
            params
        });
        ctx.body = result;
    }
}
export default BooksController;
