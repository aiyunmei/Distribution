<template>
  <div class="item">

    <div class="item-search">
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            <el-button type="primary">搜索</el-button>
          </template>
          <div class="item-search-input">
            <el-row>
              <el-col :span="4">
                <el-input v-model="searchData.loginName" placeholder="账号" class="item-search-input-l" @keyup.enter.native="search"></el-input>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="search" @click="search"></el-button>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="delete" @click="reset"></el-button>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="item-table">

      <div class="item-table-title">
        <h2>{{ tableTitle.big }}<span>{{ tableTitle.small }}</span></h2>
        <div class="item-table-add">
          <el-button type="primary" icon="edit" @click="dialog = true">新增账号</el-button>
        </div>
      </div>

      <div class="item-table-main">

        <el-table :data="tableData" border>
          <el-table-column v-for="(item,index) in table" :label="item.label" :key="index" :sortable="item.sortable ? true : false" :prop="item.name">
            <template scope="scope">
              <span v-if="item.name === 'passwordName'">
                <span v-show="!scope.row.edit" :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
                <span v-show="scope.row.edit" title="修改密码">
                  <el-input v-model="scope.row.password" type="password" placeholder="输入密码"></el-input>
                </span>
              </span>

              <span v-else-if="item.name === 'roleName'">
                <span v-show="!scope.row.edit" :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
                <span v-show="scope.row.edit" title="修改角色">
                  <el-select v-model="scope.row.roleId">
                    <el-option v-for="(item, index) in roleOptions" :label="item.roleName" :value="item.roleId" :key="index"></el-option>
                  </el-select>
                </span>
              </span>

              <span v-else-if="item.name === 'statusName'">
                <span v-show="!scope.row.edit" :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
                <span v-show="scope.row.edit" title="修改状态">
                  <el-select v-model="scope.row.status">
                    <el-option v-for="(item, index) in workOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                  </el-select>
                </span>
              </span>

              <span v-else :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template scope="scope">
              <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit = true' size="small" icon="edit">编辑</el-button>
              <el-button v-show='scope.row.edit' type="success" @click='handleUpdate(scope.$index, scope.row)' size="small" icon="check">完成</el-button>
              <el-button type="danger" @click="remove(scope.$index, scope.row)" size="small" icon="delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="item-pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page.pageNum"
            :page-size="page.pageSize"
            :total="page.total"
            layout="prev, pager, next, jumper, total">
          </el-pagination>
        </div>
      </div>

    </div>

    <!--弹窗-->
    <el-dialog v-model="dialog" title="设置权限" @close="dialogClose" top="70px">
      <div class="item-dialog">
        <div class="item-dialog-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20%" label-position="left">
            <el-form-item prop="loginName" label="账号">
              <el-input v-model="ruleForm.loginName"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="roleId" label="角色">
              <el-select v-model="ruleForm.roleId">
                <el-option v-for="(item, index) in roleOptions" :label="item.roleName" :value="item.roleId.toString()" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="status" label="状态">
              <el-radio-group v-model="ruleForm.status">
                <el-radio-button v-for="item in workOptions" :label="item.value.toString()" :key="item.value">{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <div class="item-dialog-submit">
              <el-button type="primary" icon="edit" @click="submitForm('ruleForm')">提交</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import ajax from '../../../utils/ajax/index'
  import getRoleName from './js/getRoleName'
  export default {
    data () {
      return {
        searchData: {
          loginName: ''
        },
        roleOptions: [ // 角色列表
          { roleName: '测试角色1', roleId: 1 },
          { roleName: '测试角色2', roleId: 2 },
          { roleName: '测试角色3', roleId: 3 },
          { roleName: '测试角色4', roleId: 4 },
          { roleName: '测试角色5', roleId: 5 }
        ],
        dialog: false, // 弹窗
        ruleForm: { // 表单字段
          loginName: '', password: '', roleId: '', status: ''
        },
        rules: { // 表单规则
          loginName: [
            { required: true, message: '请输入账号', toggle: 'blur' },
            { min: 2, max: 30, message: '长度在2-30之间', toggle: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', toggle: 'blur' },
            { min: 2, max: 30, message: '长度在2-30之间', toggle: 'blur' }
          ],
          roleId: [
            { required: true, message: '请选择角色', toggle: 'blur' }
          ],
          status: [
            { required: true, message: '请选择状态', toggle: 'blur' }
          ]
        }
      }
    },
    computed: mapState({
      tableTitle: state => state.tableTitle,
      table: state => state.table,
      tableData: state => state.tableData,
      page: state => state.page,
      workOptions: state => state.workOptions
    }),
    mounted () {
      this.Result()
    },
    methods: {
      Result (formData) { // 初始化
        let that = this
        let store = that.$store
        let url = that.$api.user.result
        ajax.get(url, formData || {}, store).then((res) => {
          console.log(res)
          let data = res.data
          let page = res.page
          for (let i = 0; i < data.length; i++) {
            data[i].passwordName = '******'
            data[i].edit = false
            data[i].statusName = that.$workType(data[i].status)
            data[i].roleName = getRoleName(data[i].roleId, that.roleOptions)
          }
          store.dispatch('setTableData', data)
          store.dispatch('setPage', page)
        })
      },
      search () { // 搜索
      },
      reset () { // 清空搜索数据
        this.$clearJson(this.searchData)
      },
      handleCurrentChange () { // 分页
      },
      handleUpdate (index, row) { // 提交编辑
        let that = this
        let store = that.$store
        let confirm = that.$confirm
        // let msg = that.$message
        // let url = that.$api.user.update
        let params = { id: row.id, password: row.password, roleId: row.roleId, status: row.status }

        store.dispatch('setIndexEdit', index)

        confirm('是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          console.log(params)
          row.edit = false
        }).catch(() => { row.edit = false })
      },
      remove (index, row) { // 删除
        let that = this
        let confirm = that.$confirm
        confirm('确认删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
          .then(() => {
            console.log(row)
          }).catch(() => {})
      },
      submitForm (formName) { // 提交
        let that = this
        let confirm = that.$confirm

        that.$refs[formName].validate((valid) => {
          if (valid) { // 通过验证
            confirm('是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
              .then(() => {
                console.log(that.ruleForm)
              }).catch(() => {})
          } else { // 未通过验证
            console.log('error')
          }
        })
      },
      dialogClose () { // 关闭弹窗
        this.$refs.ruleForm.resetFields()
        this.$clearJson(this.ruleForm)
      }
    }
  }
</script>
