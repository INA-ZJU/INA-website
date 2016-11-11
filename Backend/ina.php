<?php
    header("Content-type:application/json");
    function myQuery($query)
    {
        $con = mysqli_connect("127.0.0.1","root","root");
        if (!$con)
        {
            die('Could not connect: ' . mysqli_error());
        }

        mysqli_query($con,"set names 'utf8'");
        mysqli_select_db($con,"zjuina");
        $temp=mysqli_query($con,$query);
        $count=mysqli_num_rows($temp);

        $result = array();
        for ($i=0; $i < $count; $i++){
            $row=mysqli_fetch_array($temp,MYSQLI_ASSOC);
            array_push($result, $row);
        }
        mysqli_close($con);
        return $result;
    }

    function carousel()
    {
        $query=myQuery("select * from carousel");
        if (count($query)==0) {
            $result = array('code' => 410, 'errMsg'=>'The picture is not found.');
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
        else {
            $result = array('code' => 0, 'picList'=>$query);
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
    }

    function member()
    {
        if (!isset($_GET['mid'])) {
            $query=myQuery("select * from member");
        }
        else{
            $mid=$_GET['mid'];
            $query=myQuery("select * from member where mid='$mid'");
        }
        if (count($query)==0) {
            $result = array('code' => 410, 'errMsg'=>'The member is not found.');
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
        else{
            $result=array('code'=>0,'memberList'=>$query);
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
    }

    function project(){
        $query=myQuery("select * from project");
        if (count($query)==0) {
            $result = array('code' => 410, 'errMsg'=>'The project is not found.');
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
        else{
            $result['proList']=$query;
            $result['code']=0;
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
    }

    function getProjectById()
    {
        if (!isset($_GET['pid'])) {
            $result = array('code' => 411, 'errMsg'=>'Pid is not given.');
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
        $pid=$_GET['pid'];
        $query=myQuery("select * from project where pid='$pid'");
        if (count($query)==0) {
            $result = array('code' => 410, 'errMsg'=>'The project is not found.');
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
        elseif (count($query)==1) {
            $result=$query[0];
            $result['code']=0;
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
    }

    function getProjectByName()
    {
        if (!isset($_GET['projectName'])) {
            $result = array('code' => 411, 'errMsg'=>'ProjectName is not given.');
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
        $projectName=$_GET['projectName'];
        $query=myQuery("select * from project where projectName='$projectName'");
        if (count($query)==0) {
            $result = array('code' => 410, 'errMsg'=>'The project is not found.');
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
        elseif (count($query)==1) {
            $result=$query[0];
            $result['code']=0;
            echo $_GET['callback']."(".json_encode($result).")";
            return;
        }
    }

    if (!isset($_GET['target'])) {
        $result = array('code' => 412, 'errMsg'=>'Target is not given.');
        echo $_GET['callback']."(".json_encode($result).")";
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
            case 'projectById':
                getProjectById();
                break;
            case 'projectByName':
                getProjectByName();
                break;
            default:
                $result = array('code' => 413, 'errMsg'=>'This target is not defined.');
                echo $_GET['callback']."(".json_encode($result).")";
                break;
        }
    }



