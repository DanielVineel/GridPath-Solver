from flask import Blueprint,render_template,request,jsonify
from gridpath_solver.solver import Robot_Path_Finder

main=Blueprint("main",__name__)

@main.route("/")
def home():
    return render_template("index.html")

@main.route("/api/getPaths",methods=["POST"])
def getPaths():
    data=request.json
    sp=data['start'] #00 str
    ep=data['end']  #00 str
    mat=data['mat']
    sp_tuple=(int(sp[0]),int(sp[1]))
    ep_tuple=(int(ep[0]),int(ep[1]))
    res=Robot_Path_Finder(sp_tuple,ep_tuple,mat).getPaths()
  
    # res.sort()

    return jsonify({"result":res})


