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
                <el-input v-model="searchData.roleName" placeholder="角色名称" class="item-search-input-l" @keyup.enter.native="search"></el-input>
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
          <el-button type="primary" icon="edit" @click="dialogForm = true">新增角色</el-button>
        </div>
      </div>

      <div class="item-table-main">

        <el-table :data="tableData" border>
          <el-table-column v-for="(item,index) in table" :label="item.label" :key="index" :sortable="item.sortable ? true : false" :prop="item.name">
            <template scope="scope">

              <span v-if="item.name === 'roleName'">
                <span v-show="!scope.row.edit" :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
                <span v-show="scope.row.edit">
                  <el-input v-model="scope.row.roleName" placeholder="输入角色名称"></el-input>
                </span>
              </span>

              <span v-else-if="item.name === 'description'">
                <span v-show="!scope.row.edit" :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
                <span v-show="scope.row.edit">
                  <el-input v-model="scope.row.description" placeholder="输入备注"></el-input>
                </span>
              </span>

              <span v-else :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template scope="scope">
              <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit = true' size="small" icon="edit">编辑</el-button>
              <el-button v-show='scope.row.edit' type="success" @click='handleUpdate(scope.$index, scope.row)' size="small" icon="check">完成</el-button>
              <el-button type="primary" @click="setRole(scope.$index, scope.row)" size="small">设置权限</el-button>
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

    <!--新增角色弹窗-->
    <el-dialog v-model="dialogForm" title="新增角色" @close="dialogFormClose" top="70px">
      <div class="item-dialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20%" label-position="left">
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item prop="description" label="备注">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>
          <div class="item-dialog-submit">
            <el-button type="primary" icon="edit" @click="submitForm('ruleForm')">提交</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!--设置权限弹窗-->
    <el-dialog v-model="dialogRole" title="设置权限" @close="dialogRoleClose" top="70px">
      <div class="item-dialog">
        <div class="item-dialog-header">
          <el-tag type="primary">角色名称：{{dialogRoleName}}</el-tag>
        </div>
        <div class="item-dialog-body">
          <div class="item-dialog-form-check" v-for="(item,index) in checkData" :key="index">
            <el-checkbox v-model="item.checked" @change="handleCheckAllChange(index)" :disabled="item.disabled">{{ item.moduleName }}</el-checkbox>
            <el-checkbox-group v-model="item.checkVal">
              <el-checkbox v-for="check in item.moduleItems" :label="check.id" :key="check.moduleName" :disabled="item.checked === false ? true : false">{{ check.moduleName }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="item-dialog-submit">
          <el-button type="primary" icon="edit" @click="roleInfo">提交</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import ajax from '../../../utils/ajax'
  import setRoleInfo from './js/setRoleInfo'
  import clearRoleInfo from './js/clearRoleInfo'
  export default {
    data () {
      return {
        searchData: { // 搜索字段
          roleName: ''
        },
        dialogForm: false,
        dialogRole: false,
        dialogRoleName: '', // 设置权限姓名名称
        checkData: [], // 权限列表数据
        ruleForm: { // 新增字段
          roleName: '', description: ''
        },
        rules: { // 新增表单规则
          roleName: [
            { required: true, message: '请输入角色名称', toggle: 'blur' },
            { min: 2, max: 25, message: '长度在2-25之间' }
          ],
          description: [
            { min: 2, max: 25, message: '长度在2-25之间' }
          ]
        }
      }
    },
    computed: mapState({
      tableTitle: state => state.tableTitle,
      table: state => state.table,
      tableData: state => state.tableData,
      page: state => state.page
    }),
    mounted () {
      this.Result()
      this.setRoleInfo()
    },
    methods: {
      Result (formData) { // 初始化
        let that = this
        let url = that.$api.role.result
        let store = that.$store

        ajax.get(url, formData || {}, store).then((res) => {
          let data = res.data
          let page = res.page
          for (let i = 0; i < data.length; i++) {
            data[i].edit = false
          }
          store.dispatch('setTableData', data)
          store.dispatch('setPage', page)
        })
      },
      setRoleInfo () { // 写入权限列表
        let data = JSON.parse(localStorage.getItem('routerData'))
        this.checkData = setRoleInfo(data)
      },
      search () { // 搜索
      },
      reset () { // 清空搜索数据
        this.$clearJson(this.searchData)
      },
      handleCurrentChange (val) { // 分页
      },
      submitForm (formName) { // 新增角色提交
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
      handleUpdate (index, row) { // 提交编辑
        let that = this
        // let store = that.$store
        // let msg = that.$message
        let confirm = that.$confirm
        // let url = that.$api.role.update
        // let params = {}
        confirm('是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          row.edit = false
          console.log(row)
        }).catch(() => { row.edit = false })
      },
      setRole (index, row) { // 权限设置
        this.dialogRole = true
        this.dialogRoleName = row.roleName
      },
      roleInfo () { // 提交权限
        let that = this
        let confirm = that.$confirm
        confirm('是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
          .then(() => {
            console.log(that.checkData)
          }).catch(() => {})
      },
      handleCheckAllChange (index) { // 选择权限父字段 子字段解除
        if (this.checkData[index].checked === false) {
          this.checkData[index].checkVal = []
        }
      },
      remove (index, row) { // 删除
        let that = this
        let confirm = that.$confirm
        confirm('确认删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          console.log(row)
        }).catch(() => {})
      },
      dialogFormClose () { // 关闭新增弹窗
        this.$refs.ruleForm.resetFields()
        this.$clearJson(this.ruleForm)
      },
      dialogRoleClose () { // 关闭权限设置弹窗
        clearRoleInfo(this.checkData) // 调用清空权限选择数据函数
      }
    }
  }
</script>
