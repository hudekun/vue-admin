<template>
    <quill-editor class="editor"
            v-model=" content"
             ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import {mapState} from 'vuex'
 export default {
    data() {
      return {
        content:null,
        editorOption:{}
        }
    },
    computed: {
        ...mapState({
            loading: state=>state.loading,
           inputMsg:state=>state.inputMsg
        })
    },
    watch:{
        inputMsg: function (newQuestion, oldQuestion) {
            this.handelChange()
        }
    },
    methods:{
        handelChange(){
            this.content = ''
        },
        onEditorBlur(e){
            
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(e){//内容改变事件
            this.$emit('sendMsg',e.html)
            //this.$emit('sendMsg',e.text)
        }
    }
}
</script>
<style>
.editor .ql-toolbar.ql-snow + .ql-container.ql-snow { min-height: 200px;}
.editor .ql-editor{ line-height: 2;}

</style>