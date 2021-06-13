


$(document).ready(function(){
    var i = 0;//lưu số  lượng học sinh
    var iDelete = -1;//lưu vị trí phần tử bị xóa khỏi bảng
    var iSelect = -1;//lưu vị trí phần tử được chọn trong bảng
    const AVG = 8.0;

    $("#tableStudent").on("click", ".view", getStudent);
    $("#tableStudent").on("click", "#aDelete", deleteStudent);
    $("#btnOk").on("click", addStudent);
    $("#btnCancel").on("click", cancelEdit);
    $("#averageScore").on("click", averageScore);
    $("#checkGoodStudents").on("click", checkGoodStudents);

    
    function addStudent(){
        //tạo đối tượng testScore lưu thông tin học sinh
        var testScore = {
            name : "",//tên học sinh
            math : 0,//điểm toán
            physical : 0,//điểm lý
            chemistry : 0//điểm hóa
        };
    
        //truy cập vào ô input, gán giá trị cho các thuộc tính tương ứng của đối tượng testScore            
        testScore.name = $("#name").val();            
        testScore.math = $("#math").val();            
        testScore.physical = $("#physical").val();            
        testScore.chemistry = $("#chemistry").val();
    
        $("#btnCancel").css({"display": "none"});//ẩn button "Hủy"
        //làm trống ô input, bằng cách gán giá trị chuỗi rỗng
        setInput("");            
        
        //them dong moi voi thong tin duoc nhap
        insertRowTable(testScore.name, testScore.math, testScore.physical, testScore.chemistry);
    }
    
    //thêm một dòng vào bảng
    function insertRowTable(name, math, physical, chemistry){
        
        var table = $("#tableStudent");//tìm phần tử table có id tableStudent
        var row;//dòng được thêm mới hoặc được chọn
    
        //$('#myTable tr:last').after('<tr>...</tr><tr>...</tr>');
        //table.append("<tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>");
        
        //kiểm tra thông tin nhập vào có để trống không
        if(name.trim().length > 0 && math.length > 0 && physical.length > 0 && chemistry.length > 0){//nếu không có giá trị nào trống, thì cho phép thêm vào bảng
            
            if(iSelect === -1){
                i++; // tăng biến đếm lên 1, mỗi khi thêm 1 học sinh mới                
            
                row = "<tr><td>"+i+"</td><td class=\"view\">"+name+"</td><td>"+math+"</td><td>"+physical+"</td><td>"
                            +chemistry+"</td><td>?</td><td><a id=\"aDelete\" hrf=\"#\">Xóa</a></td></tr>";//Tạo một phần tử <tr> trống và thêm nó vào vị trí thứ i của bảng
    
                table.append(row);//them 1 dong moi vao bang
    
            }else{
                //var tr = $(this).closest("tr"); //truy cập đến dòng đc chọn
                
                row = getRowTable(iSelect); //truy cập đến dòng được chọn
                var avg = $(row).find("td:eq(5)").text();  //truy cập đến ô vị trí thứ 5
                //nếu học sinh đã được tính điểm trung bình,
                //thì sẽ cập nhật lại điểm trung bình
                if(avg !== "?"){
                    avg = (parseFloat(math) + parseFloat(physical) + parseFloat(chemistry))/3;
                    avg = avg.toFixed(1);
                    $(row).removeClass("text-color");
                    if(avg >= AVG){
                        $(row).addClass("text-color");
                    }
                }
                //thay đổi giá trị của các cột td của tr tại vị trí iSelect mà tr được chọn
                $(row).find("td:eq(1)").text(name);
                $(row).find("td:eq(2)").text(math);
                $(row).find("td:eq(3)").text(physical);
                $(row).find("td:eq(4)").text(chemistry);
                $(row).find("td:eq(5)").text(avg);
                //console.log(row);
                
            }                
        }
        iSelect = -1;//set giá trị mặc định là -1(không chọn dòng nào trong bảng)
        
    }
    
    //lấy giá trị với dòng tương ứng
    function getStudent(){
        //lấy hàng hiện tại 
        var tr = $(this).closest("tr"); //truy cập đến dòng đc chọn
        iSelect = parseInt(tr.find("td:eq(0)").text());//lấy giá trị thứ 0 của hàng hiện tại,
                                                       //chuyển sang kiểu int     
        
        //truy cập giá trị của các cột, gán giá trị cho từng input tương ứng
        $("#name").val(tr.find("td:eq(1)").text());
        $("#math").val(tr.find("td:eq(2)").text());
        $("#physical").val(tr.find("td:eq(3)").text());
        $("#chemistry").val(tr.find("td:eq(4)").text());
        $("#btnCancel").css({"display": "inline"});//hien button "Hủy"
    }
    
    //tính điểm trung bình của học sinh
    function averageScore(){
        var trs = $("#tableStudent tr");    //truy cập tất cả các thẻ tr trong bảng
        
        //duyệt qua các dòng tr, bắt đầu từ dòng thứ 1
        //dòng thứ 0 chứa tiêu đề
        $.each(trs, function(i, tr){
            if(i > 0){
                //truy cập vào giá trị của cột td(tính từ 0), chuyển kiểu string sang float
                
                var math = parseFloat($(tr).find("td:eq(2)").text());//truy cập vào ô thứ 2
                var physical = parseFloat($(tr).find("td:eq(3)").text());//truy cập vào ô thứ 3
                var chemistry = parseFloat($(tr).find("td:eq(4)").text());//truy cập vào ô thứ 4
                var avg = (math+physical+chemistry)/3;//tính điểm trung bình của 3 môn
                $(tr).find("td:eq(5)").text(avg.toFixed(1));//làm tròn giá trị đến chứ số thập phân thứ nhất
            }
        });
        
    }
    
    //xóa học sinh trong bảng
    function deleteStudent(){
        iDelete = $(this).parent().parent().index(); //tìm đến dòng cần xóa
    
        $(this).closest("tr").remove();//xoa 1 dong trong bang tai vi tri duoc click
    
        i--;//giảm số lượng học sinh trong bảng
        
        if(iDelete < iSelect){
            iSelect--;
        }else if(iDelete === iSelect){
            iSelect = -1;
        }
        console.log(iDelete);
        
        //cập nhật lại số thứ tự mỗi khi xóa một dòng trong bảng    
        var trs = $("#tableStudent tr");//tìm tất cả thẻ tr trong bảng học sinh
        var j = iDelete;
        $.each(trs, function(i, tr){    //duyệt qua các thẻ tr, tìm đến thẻ tr vị thứ i
            if(i > 0 && i >= iDelete){  //bỏ qua dòng đầu, duyệt từ vị trí được xóa 
                
                $(tr).find("td:eq(0)").text(j); //tìm đến cột thứ nhất của dòng được truy cập đến, thay đổi giá trị cột đó
                //console.log(td);
                j++;
            }
                
        });
        
    }
    
    //kiểm tra học sinh giỏi
    function checkGoodStudents(){
        var trs = $("#tableStudent tr");    //truy cập tất cả các thẻ tr trong bảng
        
        //duyệt qua các dòng tr, bắt đầu từ dòng thứ 1
        //dòng thứ 0 chứa tiêu đề
        $.each(trs, function(i, tr){
            if(i > 0){
                //truy cập vào cột thứ 5
                //chuyển kiểu string sang float
                var avgScore = parseFloat($(tr).find("td:eq(5)").text());
                //kiểm tra nếu >= 8.0, thì tô đỏ dòng tương ứng
                if(avgScore >= AVG){
                    console.log(avgScore);
                    $(tr).addClass("text-color");//định dạng màu đỏ cho chữ của dòng tương ứng
                }
            }
        });
        
    }
    
    //trả về 1 dòng tại ví trí index
    function getRowTable(index){
        var trs = $("#tableStudent tr");//tìm tất cả thẻ tr trong bảng học sinh
        var row;
        $.each(trs, function(i, tr){
            //console.log(i);
            if(i === index){
                row = tr;
                return false;
            }
        });
        return row;
    }
    
    //hủy bỏ chỉnh sửa thông tin học sinh
    function cancelEdit(){
        iSelect = -1;//set giá trị mặc định là -1(không có dòng nào được chọn từ bảng học sinh)
        $("#btnCancel").css({"display": "none"});//ẩn button "Hủy"
        setInput("");//làm trống input
    }
    
    //set giá trị chung cho các input
    function setInput(value){
        $("#name").val(value);
        $("#math").val(value);
        $("#physical").val(value);
        $("#chemistry").val(value);
    }


});

