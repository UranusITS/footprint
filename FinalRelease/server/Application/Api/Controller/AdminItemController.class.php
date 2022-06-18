<?php

namespace Api\Controller;

use Think\Controller;

class AdminItemController extends BaseController
{


    //获取所有项目列表
    public function getList()
    {
        $login_user = $this->checkLogin();
        $this->checkAdmin();
        $item_name = I("item_name");
        $page = I("page/d");
        $count = I("count/d");
        $username = I("username");
        $where = " is_del = 0 ";
        if ($item_name) {
            $item_name = \SQLite3::escapeString($item_name);
            $where .= " and item_name like '%{$item_name}%' ";
        }
        if ($username) {
            $username = \SQLite3::escapeString($username);
            $where .= " and username like '%{$username}%' ";
        }
        $items = D("Item")->where($where)->order(" addtime desc  ")->page($page, $count)->select();
        $total = D("Item")->where($where)->count();
        $item_members = D("ItemMember")->field("item_id , count(uid) as member_num")->group("item_id")->select();
        $return = array();
        $return['total'] = (int)$total;
        if ($items) {
            foreach ($items as $key => &$value) {
                $value['addtime'] = date("Y-m-d H:i:s", $value['addtime']);
                $value['member_num'] = $this->_get_member_num($item_members, $value['item_id']);
            }
            $return['items'] = $items;
            $this->sendResult($return);
        } else {
            $this->sendResult(array());
        }
    }

    private function _get_member_num($item_members, $item_id)
    {
        if ($item_members) {
            foreach ($item_members as $key => $value) {
                if ($value['item_id'] == $item_id) {
                    return $value['member_num'] + 1;
                }
            }
        }
        return 1;
    }

    //删除项目
    public function deleteItem()
    {
        $login_user = $this->checkLogin();
        $this->checkAdmin();
        $item_id = I("post.item_id/d");
        $return = D("Item")->soft_delete_item($item_id);
        if (!$return) {
            $this->sendError(10101);
        } else {
            $this->sendResult($return);
        }
    }

}
