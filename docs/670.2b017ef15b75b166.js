"use strict";(self.webpackChunkecommerce=self.webpackChunkecommerce||[]).push([[670],{8670:(y,h,o)=>{o.r(h),o.d(h,{WishlistModule:()=>A});var a=o(6814),l=o(1120),t=o(4769),p=o(7594),g=o(1327),f=o(8763);let _=(()=>{class e{transform(i,s){return i.split(" ").slice(0,s).join(" ")}static#t=this.\u0275fac=function(s){return new(s||e)};static#i=this.\u0275pipe=t.Yjl({name:"trim",type:e,pure:!0})}return e})();const v=["addBtn"],x=function(e){return["/details",e]};function C(e,d){if(1&e){const i=t.EpF();t.TgZ(0,"div",5)(1,"div",6)(2,"div",7)(3,"i",8),t.NdJ("click",function(n){const u=t.CHM(i).$implicit,c=t.oxw(2);return c.delFromCart(u._id),t.KtG(c.handleBtn(n))}),t.qZA()(),t._UZ(4,"img",9),t.TgZ(5,"h4",10),t._uU(6),t.qZA(),t.TgZ(7,"div",11)(8,"h5",12),t._uU(9),t.ALo(10,"trim"),t.qZA()(),t.TgZ(11,"div",13)(12,"span",14),t._uU(13),t.qZA(),t.TgZ(14,"div",15),t._UZ(15,"i",16),t.TgZ(16,"span",17),t._uU(17),t.qZA()()(),t.TgZ(18,"button",18,19),t.NdJ("click",function(n){const u=t.CHM(i).$implicit,c=t.MAs(19),m=t.oxw(2);return m.handleBtn(n),t.KtG(m.addtoCart(u.id,c))}),t._uU(20,"Add to Card "),t._UZ(21,"i",20),t.qZA()()()}if(2&e){const i=d.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(9,x,i._id)),t.xp6(3),t.Q6J("src",i.imageCover,t.LSH),t.xp6(2),t.Oqu(i.category.name),t.xp6(3),t.Oqu(t.xi3(10,6,i.title,2)),t.xp6(4),t.hij("",i.price," EGP"),t.xp6(4),t.Oqu(i.ratingsAverage)}}function W(e,d){if(1&e&&(t.TgZ(0,"div",3),t.YNc(1,C,22,11,"div",4),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngForOf",i.listProducts)}}function T(e,d){1&e&&(t.TgZ(0,"h2",21),t._uU(1,"There is No Data"),t.qZA())}const Z=[{path:"",component:(()=>{class e{constructor(i,s,n,r){this._WishlistService=i,this._CartService=s,this._ToastrService=n,this._Renderer2=r,this.listProducts=[],this.wishListData=[],this.storedWish=[],this.count=0,this.appear=!0}ngOnInit(){this.storedWish=this.wishListData,this._WishlistService.count.subscribe({next:i=>{this.count=i}}),this._WishlistService.getList().subscribe({next:i=>{this.listProducts=i.data,console.log(i),this._WishlistService.count.next(i.data.length)},error:i=>{console.log(i)}})}handleBtn(i){i.stopPropagation()}addtoCart(i,s){this._Renderer2.setAttribute(s,"disabled","true"),this._CartService.addTocart(i).subscribe({next:n=>{this._CartService.CartNumber.next(n.numOfCartItems),this.count=n.data.length+1,this._ToastrService.success(n.message),this._Renderer2.removeAttribute(s,"disabled")},error:n=>{console.log(n)}})}delFromCart(i){this._WishlistService.delList(i).subscribe({next:s=>{this._ToastrService.error(s.message),console.log(s),this._WishlistService.count.next(s.data.length),this._WishlistService.getList().subscribe({next:n=>{this.listProducts=n.data}})},error:s=>{console.log(s)}})}static#t=this.\u0275fac=function(s){return new(s||e)(t.Y36(p.M),t.Y36(g.N),t.Y36(f._W),t.Y36(t.Qsj))};static#i=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-wishlist"]],viewQuery:function(s,n){if(1&s&&t.Gf(v,5),2&s){let r;t.iGM(r=t.CRH())&&(n.add=r.first)}},decls:4,vars:2,consts:[[1,"container-fluid"],["class","row g-3 position-relative pt-5 mt-3 justify-content-center",4,"ngIf","ngIfElse"],["name",""],[1,"row","g-3","position-relative","pt-5","mt-3","justify-content-center"],["class","col-lg-2 col-md-4 col-sm-12",4,"ngFor","ngForOf"],[1,"col-lg-2","col-md-4","col-sm-12"],[1,"product","p-2",2,"cursor","pointer",3,"routerLink"],[1,"d-flex","justify-content-end","heart"],[1,"fa-regular","fa-trash-can","text-danger","fa-xl",3,"click"],["alt","",1,"w-100",3,"src","title"],[1,"imp-text"],[1,"d-flex","justify-content-between","align-items-center"],[1,"h6","fw-semibold"],[1,"raing","d-flex","justify-content-between"],[1,"fw-semibold"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-star","rating-color"],[1,"text-muted"],[1,"main-btn","w-100","mt-2",3,"click"],["addBtn",""],[1,"fa-solid","fa-cart-plus"],[1,"text-center"]],template:function(s,n){if(1&s&&(t.TgZ(0,"div",0),t.YNc(1,W,2,1,"div",1),t.qZA(),t.YNc(2,T,2,0,"ng-template",null,2,t.W1O)),2&s){const r=t.MAs(3);t.xp6(1),t.Q6J("ngIf",n.listProducts.length>0)("ngIfElse",r)}},dependencies:[a.sg,a.O5,l.rH,_],styles:[".product[_ngcontent-%COMP%]{position:relative}.product[_ngcontent-%COMP%]   .heart[_ngcontent-%COMP%]{top:15px;inset-inline-end:5px;transform:translate(120%);transition:all .6s;position:absolute;cursor:pointer}.product[_ngcontent-%COMP%]:hover   .heart[_ngcontent-%COMP%]{transform:translate(0)}"]})}return e})()}];let b=(()=>{class e{static#t=this.\u0275fac=function(s){return new(s||e)};static#i=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[l.Bz.forChild(Z),l.Bz]})}return e})(),A=(()=>{class e{static#t=this.\u0275fac=function(s){return new(s||e)};static#i=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[a.ez,b]})}return e})()}}]);