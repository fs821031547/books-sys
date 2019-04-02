import "./add.css";
const add = {
    init() {
        console.log("add组件对应的入口文件");
        xtag.create('x-add', class extends XTagElement {
            constructor(){
                super();
                console.log("初始化操作");
                this.datas = {
                    user:"rock"
                }
            }
            '::template(true)' (){
                return `<form>
                <div class="form-group">
                  <label for="exampleInputEmail1">书名</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" placeholder="输入书名">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">作者</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" placeholder="输入作者">
                </div>
                <button id="add-btn" type="button" class="btn btn-primary">Submit</button>
              </form>`
            }
            "click::event"(e){
                if(e.target.id == "add-btn"){
                    alert("请求");
                }
            }
        });
    }
}
export default add;