<template>
	<div id="app">
		<nav-header></nav-header>
		<nav-bread>
			<span>列表</span>
		</nav-bread>
		<div class="accessory-result-page accessory-page">
		  <div class="container">
		    <div class="filter-nav">
		      <span class="sortby">Sort by:</span>
		      <a href="javascript:void(0)" class="default cur">Default</a>
		      <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xmlns:xlink="http://www.w3.ogg/1999/xlink" xlink:href="#icon-arrow-short"></use></svg></a>
		      <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop()">Filter by</a>
		    </div>
		    <div class="accessory-result">
		      <!-- filter -->
		      <div class="filter stopPop" id="filter" :class="{'filterby-show':filterby}">
		        <dl class="filter-price">
		          <dt>Price:</dt>
		          <dd ><a href="javascript:void(0)" @click="priceChecked='all';page=1;getGoodsList()" :class="{'cur':priceChecked=='all'}">All</a></dd>
		          <dd v-for="(price,index) in priceFilter">
		            <a href="javascript:void(0)"  @click="setPriceFilter(index)" :class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
		          </dd>
		        </dl>
		      </div>

		      <!-- search result accessories list -->
		      <div class="accessory-list-wrap">
		        <div class="accessory-list col-4">
		          <ul>
		            <li v-for="(item ,index) in goodsList">
		              <div class="pic">
		                <a href="#"><img v-lazy="'/static/' + item.productImage" alt=""></a>
		              </div>
		              <div class="main">
		                <div class="name">{{item.productName}}</div>
		                <div class="price">{{item.salePrice}}</div>
		                <div class="btn-area">
		                  <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
		                </div>
		              </div>
		            </li>
		          </ul>
		          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" ref="loading">
		            <img src="/static/loading-svg/loading-balls.svg" alt="" v-show="loading">
		            <p v-show="loadingEnd">已经是最后一页了</p>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="md-overlay" v-show="overlay" @click="closePop"></div>
		<model v-bind:mdShow="mdShow" v-on:close="closeModal">
			<p slot="message">
				请先登录
			</p>
			<div slot="btnGroup">
				<a class="btn btn-m" @click="mdShow = !mdShow">关闭</a>
			</div>
		</model>	
		<model v-bind:mdShow="mdShowCart" v-on:close="closeModal">
			<p slot="message">
				加入购物车成功
			</p>
			<div slot="btnGroup">
				<a class="btn btn-m" @click="mdShowCart = false">继续购物</a>
				<router-link class="btn btn-m" to="/cart">查看购物车</router-link>
			</div>
		</model>	
		<nav-footer></nav-footer>
	</div>
	
</template>
<script>
	import "./../assets/css/base.css"
	import "./../assets/css/product.css"
	import NavHeader from "@/components/NavHeader.vue"
	import NavFooter from "@/components/NavFooter.vue"
	import NavBread from "@/components/NavBread.vue"
	import Model from "@/components/Model.vue"
	import axios from "axios"

	export default{
		data(){
			return{
				goodsList:[],
				priceFilter:[{
					startPrice:"0.00",
					endPrice:"100.00"
				},{
					startPrice:"100.00",
					endPrice:"500.00"
				},{
					startPrice:"500.00",
					endPrice:"1000.00"
				},{
					startPrice:"1000.00",
					endPrice:"5000.00"
				}],
				priceChecked:"all",
				filterby:false,
				overlay:false,
				sortFlag:true,
				page:1,
				pageSize:6,
				busy:true,
				loading:false,
				loadingEnd:false,
				mdShow:false,
				mdShowCart:false
			
			}

		},
		components:{
			NavHeader,
			NavFooter,
			NavBread,
			Model
		},
		mounted: function(){
			this.getGoodsList()

		},
		methods:{
			getGoodsList(flag){
				var param= {
					page:this.page,
					pageSize:this.pageSize,
					sort:this.sortFlag ? 1:-1,
					level:this.priceChecked
				}
				this.loading=true;
				this.loadingEnd = false;
				axios.get("/goods/list",{
					params:param
				}).then((response)=>{	
					setTimeout(()=>{
						this.loading=false;
					},1500) 
					var res = response.data;
					if (res.status == '0') {
						if (flag) {
							this.goodsList =this.goodsList.concat(res.result.list);
							if (res.result.count< this.pageSize) {
							/*	this.$refs.loading.innerHTML="已经到最后一页了"
*/								
								setTimeout(()=>{
									this.loadingEnd=true
								},2000) 
								this.busy = true
							}else{
								this.busy = false
							}

						}else{
							this.goodsList = res.result.list;
							this.busy = false;
						}
					}
					
				})
			},
			setPriceFilter(index){
				this.priceChecked=index;
				this.page=1;
				this.getGoodsList()
				this.closePop()
			},
			showFilterPop(){
				this.filterby=true
				this.overlay=true
			},
			closePop(){
				this.filterby=false
				this.overlay=false
			},
			sortGoods() {
				this.sortFlag = !this.sortFlag;
				this.page=1;
				this.getGoodsList()
			},
			loadMore(){
				
				this.busy = true
				setTimeout(()=>{
					this.page++;
					this.getGoodsList(true);
				},1000)
			},
			addCart(productId){
				console.log(productId)
				axios.post("/goods/addCart",{productId:productId}).then((res)=>{
					console.log(res)
					if (res.data.status == "0") {
						this.mdShowCart=true;
					}else{
						this.mdShow = true;
					}
				})
			},
			closeModal(){
				this.mdShow = false;
			}
		}
	}
</script>