<template>
    <card-btn>
		<div class="row_wrap">
			<div class="img_wrap" ><el-avatar icon="el-icon-user-solid" :size="50" :src="images"></el-avatar></div>
			<div class="file_wrap">
				<a href="javascript:;" class="file">选择文件
					<input type="file" @change="getFile($event)">
				</a>
			</div>
		</div>
    </card-btn>
</template>
<script>
import { changeAvatar,saveAvatar } from "../../api/user";

export default {
    name:'avatar',
    data() {
		return {
			images:''
        }
	},
	
	methods: {
		getFile(event) {
            this.file = event.target.files[0];  //获取上传元素信息
            var that = this
            event.preventDefault();
            // 只能通过formData方式来传输文件
            var formData = new FormData();  
			formData.append('file', this.file);
            changeAvatar(formData).then(res=>{
				this.images = res.url
				 this.$store.commit('user/SET_AVATAR',{avatar:res.url})
				this.handelSaveavatar(res.url)
			})
		},
		handelSaveavatar(url){
			var name_ = sessionStorage.getItem('username')
			saveAvatar({"name":name_,"img":url}).then(res=>{
				this.$message.success(res.info);
			})
		}
	}
			
}
</script>
<style lang="less" scoped>
.row_wrap{
	display: flex;
}
.img_wrap{
	padding: 10px;
}
.file_wrap{
	padding: 10px;
	margin-top: 6px;
}
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
</style>