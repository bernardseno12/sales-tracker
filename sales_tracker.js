import Graph from './sales_charts_module.js';

document.addEventListener('DOMContentLoaded', function(){
    const Sales = {
        Init: function(config){
            this.config = config;

            this.BindEvents();
        },
        BindEvents: function(){
            let here = this.config;

            this.DrawGraph();

            here.sel_manager.addEventListener('change', (e)=> this.DropDown({param: 1, event: e}));
            here.sel_product.addEventListener('change', (e)=> this.DropDown({param: 2, event: e}));
            here.btn_clr.addEventListener('click', this.ClearForm);
            here.btn_sub.addEventListener('click', this.CreateForm);
            here.tbl_tbl.addEventListener('click', this.DeleteForm);
            here.tbl_tbl.addEventListener('click', this.UpdateForm);
        },
        DrawGraph: ()=> {
            const self = Sales.config;

            let totalIphone = 550;
            let totalSamsung = 200;
            let totalNokia = 210;
            let totalOppo = 450;

            const proName = ['iPhone', 'Samsung', 'Nokia', 'Oppo'];
            const prodData = [totalIphone, totalSamsung, totalNokia, totalOppo];
            const productGraph = new Graph(proName, prodData);
            const prodCanvas = self.can_sales_chart;
            productGraph.drawGraph(prodCanvas, "rgb(151, 180, 255)", 'bar');

            const mngName = ['John Doe', 'Jane Doe'];
            const mngData = [720, 350];
            const mngGraph = new Graph(mngName, mngData);
            const mngCanvas = self.can_sales_chart_manager;
            mngGraph.drawGraph(mngCanvas, "rgb(151, 180, 255)", 'pie');

            const pitchDate = ['Jan', 'Feb', 'March'];
            const pitchTotal = [200, 300, 180];
            const pitchGraph = new Graph(pitchDate, pitchTotal);
            const pitchCanvas = self.can_sales_chart_agent;
            pitchGraph.drawGraph(pitchCanvas, "rgb(151, 180, 255)", 'line');
        },
        DropDown: ({param, event})=> {
            const self = Sales.config;
            let selManager = event.target.value;
            let selProduct = event.target.value;

            switch(param){
                case 1: (selManager === '0') ? alert('Please Specify Which Manager') : self.in_manager.value = selManager ; break;
                case 2: (selProduct === '0') ? alert('Please Specify Which Product') : self.in_product.value = selProduct ; break;
                default: console.log('Please Specify Which Route');
            }
        },
        ClearForm: ()=> {
            const self = Sales.config;

            self.in_date.value = '';
            self.in_empid.value = '';
            self.in_fname.value = '';
            self.in_lname.value = '';
            self.in_manager.value = '';
            self.in_ordernum.value = '';
            self.in_product.value = '';
        },
        CreateForm: ()=> {
            const self = Sales.config;
            let id = Math.floor(Math.random() * 1000000);
            let date = self.in_date.value;
            let empid = self.in_empid.value;
            let fname = self.in_fname.value.trim();
            let lname = self.in_lname.value.trim();
            let fullname = fname + ' ' +  lname;
            let ordernum = self.in_ordernum.value;
            let manager = self.in_manager.value;
            let product = self.in_product.value;

            if(self.in_date.value == '' || self.in_empid.value == '' || self.in_fname.value == '' || self.in_lname.value == '' || self.in_ordernum.value == '' || self.in_manager.value == '' || self.in_product.value == ''){
                alert('All Fields Are Required');
            }
            else{
                let formHTML = `
                    <tr class="tr-style" id="${id}">
                        <td data-label="date">${date}</td>
                        <td data-label="empid">${empid}</td>
                        <td data-label="fullname" data-fname="${fname}" data-lname=${lname}>${fullname}</td>
                        <td data-label="ordernum">${ordernum}</td>
                        <td data-label="manager">${manager}</td>
                        <td data-label="product">${product}</td>
                        <td data-label="buttons">
                            <button type="button" class="btn-edit btn-style-html">EDIT</button>
                            <button type="button" class="btn-clr btn-style-html">DEL</button>
                        </td>
                    </tr>
                `;

                let dataAction = self.btn_sub.getAttribute('data-action');

                if(dataAction == 'create'){
                    self.tbl_tbody.insertAdjacentHTML('beforeend', formHTML);
                    Sales.ClearForm();
                }
                else{
                    let trId = self.btn_sub.getAttribute('tr-id');
                    let trElements = document.getElementsByTagName('tr');

                    for(let i = 0; i < trElements.length; i++){
                        if(trElements[i].id == trId){
                            let tdElements = trElements[i].getElementsByTagName('td');
                            
                            if(tdElements.length > 1){
                                tdElements[0].textContent = date;
                                tdElements[1].textContent = empid;
                                tdElements[2].textContent = fullname;
                                tdElements[2].setAttribute('data-fname', fname);
                                tdElements[2].setAttribute('data-lname', lname);
                                tdElements[3].textContent = ordernum;
                                tdElements[4].textContent = manager;
                                tdElements[5].textContent = product;
                            }
                            break;
                        }
                    }
                    self.btn_sub.setAttribute('data-action', 'create');
                    Sales.ClearForm();
                }
            }
        },
        UpdateForm: (e)=> {
            const self = Sales.config;
            let btn = e.target.closest('.btn-edit');
            if(!btn) { return; }

            let tr = btn.closest('tr');
            let tds = tr.querySelectorAll('td');
            let date = tds[0].textContent;
            let empid = tds[1].textContent;
            let fname = tds[2].getAttribute('data-fname');
            let lname = tds[2].getAttribute('data-lname');
            let ordernum = tds[3].textContent;
            let manager = tds[4].textContent;
            let product = tds[5].textContent;

            self.btn_sub.setAttribute('data-action', 'update');
            self.btn_sub.setAttribute('tr-id', tr.getAttribute('id'));
            self.in_date.value = date;
            self.in_empid.value = empid;
            self.in_fname.value = fname;
            self.in_lname.value = lname;
            self.in_manager.value = manager;
            self.in_ordernum.value = ordernum;
            self.in_product.value = product;
        },
        DeleteForm: (e)=> {
            const self = Sales.config;
            let btn = e.target.closest('.btn-clr');
            if(!btn){ return; }
            
            btn.closest('tr').remove();
        },
    };
    Sales.Init({
        btn_sub             :               document.querySelector('#btn-sub'),
        btn_clr             :               document.querySelector('#btn-clr'),

        can_sales_chart     :               document.querySelector('#can-sales-chart'),
        can_sales_chart_agent:              document.querySelector('#can-sales-chart-agent'),
        can_sales_chart_manager:            document.querySelector('#can-sales-chart-manager'),

        in_date             :               document.querySelector('#in-date'),
        in_empid            :               document.querySelector('#in-empid'),
        in_fname            :               document.querySelector('#in-fname'),
        in_lname            :               document.querySelector('#in-lname'),
        in_ordernum         :               document.querySelector('#in-ordernum'),
        in_manager          :               document.querySelector('#in-manager'),
        in_product          :               document.querySelector('#in-product'),

        sel_manager         :               document.querySelector('#sel-manager'),
        sel_product         :               document.querySelector('#sel-product'),

        tbl_tbl             :               document.querySelector('#tbl-tbl'),
        tbl_tbody           :               document.querySelector('#tbl-tbody')
    });
});