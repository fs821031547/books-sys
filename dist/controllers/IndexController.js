"use strict";

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Index = require("../models/Index");

const {
  URLSearchParams
} = require("url");

class IndexController {
  constructor() {}

  actionIndex() {
    return async (ctx, next) => {
      const index = new Index();
      const result = await index.getData();
      const html = await ctx.render("books/pages/list", {
        data: result.data
      });

      if (ctx.request.header["x-pjax"]) {
        const $ = _cheerio2.default.load(html);

        ctx.body = $("#js-hooks-data").html();
      } else {
        ctx.body = html;
      }
    };
  }

  actionAdd() {
    return async (ctx, next) => {
      const html = await ctx.render("books/pages/add");

      const $ = _cheerio2.default.load(html);

      if (ctx.request.header["x-pjax"]) {
        let _result = "";
        $(".pjaxcontent").each(function () {
          _result += $(this).html();
        });
        $(".layload-js").each(function () {
          _result += `<script src="${$(this).attr("src")}"></script>`;
        }); // $(".layload-css").each(function () {
        //     _result += $(this).html()
        // })

        ctx.body = _result;
      } else {
        ctx.body = html;
      }
    };
  }

  actionSave() {
    return async (ctx, next) => {
      const index = new Index();
      const params = new URLSearchParams();
      params.append("Books[name]", "测试");
      params.append("Books[author]", "测试111");
      const result = await index.saveData({
        params
      });
      ctx.body = result;
    };
  }

}

module.exports = IndexController;