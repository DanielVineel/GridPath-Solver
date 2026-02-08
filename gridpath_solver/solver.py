class Robot_Path_Finder:

    def __init__(self,startPoint:tuple,endPoint:tuple,matrix:list):
        """
        Docstring for __init__
        
        :param self: Description
        :param startPoint: Starting Point
        :type startPoint: tuple
        :param endPoint: Ending Point
        :type endPoint: tuple
        :param matrix: Matrix
        :type matrix: list
        """
        self.start_point=startPoint
        self.end_point=endPoint
        self.matrix=matrix
        self.walls=0
        self.rows,self.cols=len(matrix),len(matrix[0])
        self.res=self.__getLayout()
        

    def __getLayout(self):
        mat=self.matrix
        values={}
        for r in range(self.rows):
            for c in range(self.cols):
                if(mat[r][c]==1):
                    self.walls+=1
                    continue
                if(r==self.end_point[0] and c==self.end_point[1]):
                    continue
                values[str(r)+str(c)]=list()
            
                if c-1>=0 and mat[r][c-1]==0:#left
                    values[str(r)+str(c)].append(str(r)+str(c-1))
                if c+1<self.cols and mat[r][c+1]==0:#right
                    values[str(r)+str(c)].append(str(r)+str(c+1))
                if r-1>=0 and mat[r-1][c]==0:#top
                    values[str(r)+str(c)].append(str(r-1)+str(c))
                if r+1<self.rows and mat[r+1][c]==0:#bottom
                    values[str(r)+str(c)].append(str(r+1)+str(c))
        return values
    
    
    def __getIndex(self,resultList,element,repeat):
        count=0
        np=0
        for x in resultList:
            if(element in x):
                np+=1
                if(np==repeat):
                    return count
            count+=1
        return -1
    

    def __filterPaths(self,resList:list,end:str):
      
        satisfied=[]
        for x in resList:
            if end in x:
                satisfied.append(x)
       
        

        set1=set()
    
        for x in satisfied:
            n1=x[:x.index(end)+2]
            set1.add(n1)
        min_len=-1

        
        
        output=[]
        for x in set1:
            len1=len(x)
            if(min_len==-1):
                min_len=len1
            elif len1<min_len :
                min_len=len1
        for x in set1:
            if len(x)==min_len:
                output.append(x)
        
        output.sort()
        return output
    


    def getPaths(self):
        data=set()
        data.add(str(self.start_point[0])+str(self.start_point[1]))
        completed=False
        old_set=set()
        for _ in range((self.rows*self.cols-self.walls)*2):
            
            if(completed):
                print('breaked at - ',_)
                break
            new_data=set()

            for path in data:
                if(path[-2:]==str(self.end_point[0])+str(self.end_point[1])):
                    old_set.add(path)
                    continue
                temp=[]
                if(len(path)>=8):
                    temp = (path.split("-"))[:-2]                  
                    temp=list(int(x) for x in temp)

                    
                for child in self.res[path[-2:]]:
                    # print("______",_,child)
                    if(len(temp)>0):
                        if(int(child)+10 in temp or int(child)-10 in temp or int(child)+1 in temp or int(child)-1 in temp):#checking if any 2 becomes neighbour
                            # print(f"child - {child} , temp - {temp}")
                            continue

                    # if( (int(child)-int(path[-8:-6]) in [-1,10,-10,1]) ): #checking if it formes square before nodes
                    #     print(int(child)+10 , int(child)-10 , int(child)+1 , int(child)-1 ,temp)
                    #     print(f"child - {child} , path - {path}")
                        # return list(old_set)
                        # continue
                        

                    if(child in path ): #checking already present  
                        continue
                    if(child==str(self.end_point[0])+str(self.end_point[1])):
                        old_set.add(path+"-"+child)
                        
                    else:
                        next_data=path+"-"+child
                        new_data.add(next_data)
     
            if data==new_data:
                break
            data=new_data
            # if _ == 12:
            #     print(new_data)

        # return list(data)   
            
        print("---completed--")
        return self.__filterPaths(list(old_set),str(self.end_point[0])+str(self.end_point[1]))

        #5x5 = 70


    
