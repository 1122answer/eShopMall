<template>
	<header class="header">
		  <symbol id="icon-cart" viewBox="0 0 38 32">
		    <title>cart</title>
		    <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
		    <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
		    <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
		    <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
		  </symbol>
		  <div class="navbar">
		    <div class="navbar-left-container">
		      <a href="/">
		        <img class="navbar-brand-logo" src="static/logo.jpg"></a>
		    </div>
		    <div class="navbar-right-container">
		      <div class="navbar-menu-container">
			      <div class="navbar-cart-container">
			          <span class="navbar-cart-count"></span>
			          <a class="navbar-link navbar-cart-link" href="/#/cart">
			            <svg class="navbar-cart-logo">
			              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
			            </svg>
			          </a>
		        </div>
		        <!--<a href="/" class="navbar-link">我的账户</a>-->
		        <a href="javascript:void(0)" class="navbar-link" v-if="loginname" @click="logOut">Logout</a> 
		        <span class="navbar-link loginname-box" v-text="loginname" v-if="loginname"></span>
		        <a href="javascript:void(0)" class="navbar-link" @click="loginmodalFlag = true" v-if="!loginname">Login</a>
		         
		      </div>
		    </div>
		  </div>
		  <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':loginmodalFlag}">
		  	<div class="md-modal-inner">
		  		<div class="md-top">
		  		    
		  			<div class="md-title" >Login in</div>
		  			<div class="md-title" v-if="loginname" >Login Out</div>
		  			<button class="md-close" @click="loginmodalFlag = false">Close</button>
		  		</div>
		  		<div class="md-content">
		  			<div class="confirm-tips">
		  				<div class="error-wrap">
		  					<span class="error error-show" v-show="errorTip">用户名或密码错误</span>
		  				</div>
		  				<ul>
			  				<li class="regi_form_input">
			  					<i class="icon IconPeople"></i>
			  					<input type="text" tabindex="1" class="regi_login_input" name="loginname" v-model="userName" >
			  				</li>
		  					<li class="regi_form_input noMargin">
		  						<i class="icon IconPwd"></i>
		  						<input type="password" tabindex="2" class="regi_login_input" name="password" v-model="userPwd"  @keyup.enter="login">
		  					</li>
		  				</ul>
		  			</div>
		  			<div class="btn-wrap ">
		  				<button class="btn btn-login" @click="login" >登录</button>
		  			</div>
		  		</div>
		  	</div>
		  </div>
		  <div class="md-overlay" v-if="loginmodalFlag" @click="loginmodalFlag = false"></div>
		</header>

</template>
<style>
	.navbar-left-container{
		float: left;
	}
	.navbar-cart-logo{
		width:20px;
		height: 20px
	}
	.navbar-link{
		
		float: right;
	}
	.navbar-cart-container{
		float: right;
		margin-left: 20px
	}
	.loginname-box{
		margin-right: 10px
	}
</style>
<script>
	import"./../assets/css/login.css"
	import axios from "axios"
	export default{
		data() {
			return{
				userName:"",
				userPwd:"",
				errorTip:false,
				loginmodalFlag:false,
				loginname:null
			}
		},
		mounted(){
			this.checkLogin()
		},
		methods:{
			checkLogin(){
				axios.get("/users/checkLogin").then((response)=>{
					let res = response.data
					if (res.status == "0") {
						this.loginname = res.result
					}
				})
			},
			login() {
				if (!this.userName || !this.userPwd) {
					this.errorTip = true;
					return;
				}
				axios.post("/users/login",{
					userName:this.userName,
					userPwd:this.userPwd
				}).then((response)=>{
					let res = response.data;
					if (res.status == "0") {
						this.errorTip = false;
						this.loginmodalFlag = false;
						this.loginname = res.result.userName
						console.log(this.loginname)
					}else{
						this.errorTip = true
					}
				})
			},
			logOut(){
				axios.post("/users/logout").then((response)=>{
					let res = response.data;
					if (res.status==0) {
						this.loginname=""
					}
				})
			}
		}
	}
</script>