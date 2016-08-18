<?php
    function myQuery($query)
    {
        $con = mysql_connect("localhost:3306","root","2016zjuINA");
        if (!$con)
        {
            die('Could not connect: ' . mysql_error());
        }

        mysql_query("set names 'utf8'");
        mysql_select_db("zjuina", $con);
        $temp=mysql_query($query);
        $count=mysql_num_rows($temp);

        $result = array();
        for ($i=0; $i < $count && $i < 5 ; $i++){
            $row=mysql_fetch_array($temp,'MYSQL_ASSOC');
            array_push($result, $row);
        }
        mysql_close($con);
        return $result;
    }

    function carousel()
    {
        if (!isset($_GET['picName'])) {
            $result = array('code' => 411, 'errMsg'=>'PicName is not given.');
            echo json_encode($result);
            return;
        }
        $picName=$_GET['picName'];
        $query=myQuery("select * from carousel where picName='$picName'");
        if (count($query)==0) {
            $result = array('code' => 410, 'errMsg'=>'The picture is not found.');
            echo json_encode($result);
            return;
        }
        elseif (count($query)==1) {
            $result = array('code' => 0, 'picUrl'=>$query[0]['picUrl']);
            echo json_encode($result);
            return;
        }
    }

    function member()
    {
        if (!isset($_GET['mid'])) {
            $result = array('code' => 411, 'errMsg'=>'Mid is not given.');
            echo json_encode($result);
            return;
        }
        $mid=$_GET['mid'];
        $query=myQuery("select * from member where mid='$mid'");
        if (count($query)==0) {
            $result = array('code' => 410, 'errMsg'=>'The member is not found.');
            echo json_encode($result);
            return;
        }
        elseif (count($query)==1) {
            // $result = array('code' => 0, 'picUrl'=>$result[0]['picUrl']);
            $result=$query[0];
            $result['code']=0;
            echo json_encode($result);
            return;
        }
    }

    function project()
    {
        if (!isset($_GET['pid'])) {
            $result = array('code' => 411, 'errMsg'=>'Pid is not given.');
            echo json_encode($result);
            return;
        }
        $pid=$_GET['pid'];
        $query=myQuery("select * from project where pid='$pid'");
        if (count($query)==0) {
            $result = array('code' => 410, 'errMsg'=>'The project is not found.');
            echo json_encode($result);
            return;
        }
        elseif (count($query)==1) {
            $result=$query[0];
            $result['code']=0;
            echo json_encode($result);
            return;
        }
    }

    function getProjectByName()
    {
        if (!isset($_GET['projectName'])) {
            $result = array('code' => 411, 'errMsg'=>'ProjectName is not given.');
            echo json_encode($result);
            return;
        }
        $projectName=$_GET['projectName'];
        $query=myQuery("select * from project where projectName='$projectName'");
        if (count($query)==0) {
            $result = array('code' => 410, 'errMsg'=>'The project is not found.');
            echo json_encode($result);
            return;
        }
        elseif (count($query)==1) {
            $result=$query[0];
            $result['code']=0;
            echo json_encode($result);
            return;
        }
    }

    if (!isset($_GET['target'])) {
        $result = array('code' => 412, 'errMsg'=>'Target is not given.');
        echo json_encode($result);
    }
    else{
        switch ($_GET['target']) {
            case 'carousel':
                carousel();
                break;
            case 'member':
                member();
                break;
            case 'project':
                project();
                break;
            case 'projectByName':
                getProjectByName();
                break;
            default:
                $result = array('code' => 413, 'errMsg'=>'This target is not defined.');
                echo json_encode($result);
                break;
        }
    }



