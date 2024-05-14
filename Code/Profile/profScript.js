var loadFile = function(event, id_image) 
{
    var output = document.getElementById(id_image);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() 
    {
        URL.revokeObjectURL(output.src)
    }
};

var handleBrowseClick = function (hidden_input_image)
{
    // alert("teste");
    var fileinputElement = document.getElementById(hidden_input_image);
    fileinputElement.click();
}