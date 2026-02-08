

    document.addEventListener("DOMContentLoaded",()=>{

    const red="red"
    const blue="blue"
    const green="green"
    const noColor=""

    let buttons=[
        document.getElementById("btn-start"),
        document.getElementById("btn-end"),
        document.getElementById("btn-walls"),
         document.getElementById("btn-submit")
    ]

    let btn=document.getElementById("btn-walls");
       
    let nrows = 0;
    let ncols = 0;
    let walls = true;
    let start_point = false;
    let end_point = false;

    let startDiv = "";
    let endDiv = "";
    let mat= [];
    let grid=null;

    function selectStart() {
        btn.classList.toggle("sel-btn")
        btn=document.getElementById("btn-start")
        btn.classList.toggle("sel-btn")

        start_point = true;
        end_point = walls = false;
    }

    function selectEnd() {
        btn.classList.toggle("sel-btn")
        btn=document.getElementById("btn-end")
        btn.classList.toggle("sel-btn")
        end_point = true;
        start_point = walls = false;
    }

    function selectWalls() {
        btn.classList.toggle("sel-btn")
        btn=document.getElementById("btn-walls")
        btn.classList.toggle("sel-btn")
        walls = true;
        end_point = start_point = false;
    }



    async function submitSelection() {
        if (startDiv === "" || endDiv === "") {
            alert("Please select start and end points");
            return;
        }

        sp_id=startDiv.id
        ep_id=endDiv.id
            
        if(sp_id == ep_id ){
            startDiv.style.backgroundColor=noColor
            endDiv.style.backgroundColor=noColor
            startDiv=endDiv=""
            alert("Both starting and ending not to be same")
            return
        }
        resetGrid()
        document.body.style.cursor = "wait";
        document.getElementById("loading-overlay").classList.remove("none");

        // const buttons = document.querySelectorAll("button");
        for(let btn of buttons){
             btn.disabled = true
        }


        const payload = {
            mat: mat,
            start: startDiv.id,
            end: endDiv.id
        };
        
        try {
            const res = await fetch("/api/getPaths", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            const paths=data.result;
            document.getElementById("total-ways").innerText=`Total Number of Optimal Solutions : ${paths.length}`
            // console.log(paths)
            for(let ind in paths){
            {
                let temp_grid=grid.cloneNode(true)
                temp_grid.id=`result-${ind}`
                temp_grid.classList.add("paths")
                // console.log(temp_grid)
                applyColor(paths[ind],getRandomColor(),temp_grid)
                document.getElementById('results').appendChild(temp_grid)
             
                };
                
            }
            alert("Path received from server!");
        
    }catch (err) {
            console.error(err);
            alert("Server error");
        }finally{
        
            
        document.body.style.cursor = "default";
        document.getElementById("loading-overlay").classList.add("none");
        buttons.forEach(btn => btn.disabled = false);

        }
    }

    function applyColor(path,color,grid){

        let places=path.split("-")
        for(let x of places){
            grid.getElementsByClassName(x)[0].style.backgroundColor=color
        }

    }

    

    function resetGrid() {
        document.getElementById('results').innerHTML=""
    }


    function getRandomColor() {
        let r, g, b;

        while (true) {
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);

            // avoid white-ish
            const isWhite = r > 220 && g > 220 && b > 220;

            // avoid red-ish
            const isRed = r > 180 && g < 100 && b < 100;

            // avoid green-ish
            const isGreen = g > 180 && r < 100 && b < 100;

            // avoid blue-ish
            const isBlue = b > 180 && r < 100 && g < 100;

            if (!isWhite && !isRed && !isGreen && !isBlue) break;
        }

        return `rgb(${r}, ${g}, ${b})`;
        }

    

    document.getElementById("btn-start").addEventListener("click", selectStart);
    document.getElementById("btn-end").addEventListener("click", selectEnd);
    document.getElementById("btn-walls").addEventListener("click", selectWalls);
    document.getElementById("btn-submit").addEventListener("click", submitSelection);

    document.getElementById("basic-info").addEventListener("click",(e)=>{
            e.preventDefault()
            nrows=Number(document.getElementById("nrows").value)
            ncols=Number(document.getElementById("ncols").value)
            if(nrows == 0){
                alert("Please Enter the Number of Rows")
            }else if(ncols== 0){
                alert("Please Enter the Number of Columns")
            }else{

                document.getElementById("first-info").classList.toggle("none")
                document.getElementsByClassName("controls")[0].classList.toggle("none")
                document.getElementById("reload").classList.toggle("none")
                document.getElementById("total-ways").classList.toggle("none")
                document.getElementById("results").classList.toggle("none")
                document.getElementById("second-part").classList.toggle("none")
                document.getElementById("desc").classList.toggle("none")
    
                getGrid()
            }
        })




        function getPoints(div){
            id=div.id
            p1=Number(id[0])
            p2=Number(id[1])
           
            return [p1,p2]

        }

        function getGrid(){

            let mainGrid=document.getElementById('grid')

            grid=document.createElement('div')
            grid.style.display="grid";
            grid.style.gridTemplateRows=`repeat( ${nrows},60px)`
            grid.style.gridTemplateColumns=`repeat( ${ncols},60px)`

            mainGrid.classList.toggle("none")
            mainGrid.style.gridTemplateRows=`repeat( ${nrows},60px)`
            mainGrid.style.gridTemplateColumns=`repeat( ${ncols},60px)`

            for(let r=0 ; r<nrows;r++){
                mat[r]=[]
                for(let c=0;c<ncols;c++){
                    mat[r][c]=0

                    let div=document.createElement('div')

                    // clone grid
                    let div2=document.createElement('div');
                    div2.classList.add(`${r}${c}`)
                    grid.appendChild(div2);

                    div.id=`${r}${c}`
                    div.addEventListener('click',(e)=>{
                        if(walls){
                            if(div.style.backgroundColor == red){
                                div.style.backgroundColor=noColor;
                                poi=getPoints(div);
                                r=poi[0];
                                c=poi[1];

                                grid.getElementsByClassName(`${r}${c}`)[0].style.backgroundColor=noColor
                                
                                mat[r][c]=0;

                            }else{
                                div.style.backgroundColor=red;
                                poi=getPoints(div);
                                r=poi[0];
                                c=poi[1]
                                grid.getElementsByClassName(`${r}${c}`)[0].style.backgroundColor=red

                                mat[r][c]=1;

                            }
                        }else if(start_point){
                            if(startDiv!=""){
                                startDiv.style.backgroundColor=noColor;
                                r,c=getPoints(startDiv);
                                mat[r][c]=0;
                            }
                            div.style.backgroundColor=blue;
                            poi=getPoints(div);r=poi[0];c=poi[1];
                            mat[r][c]=0;
                            startDiv=div;
                        }else if(end_point){
                            if(endDiv!=""){
                                endDiv.style.backgroundColor=noColor;
                                r,c=getPoints(endDiv);
                                mat[r][c]=0;
                            }
                            div.style.backgroundColor=green;
                            poi=getPoints(div);
                            r=poi[0];
                            c=poi[1];
                            mat[r][c]=0;
                            endDiv=div;
                        }
                    })
                    mainGrid.append(div)
                }
            }

        }

           

            

    




        

    })

