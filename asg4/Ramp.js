class Ramp{
    constructor(){
        this.type='pyramid';
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
    }

    render(){
        
        var rgba = this.color;

        //Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        //Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        var lateralEdge = 
        
        // Base
        drawTriangle3D( [.5,0,0, 1,0,1, 0,0,1 ]);
        //sides
        
        drawTriangle3D( [.5,0,0, 1,.5,1, 1,0,1 ]);
        drawTriangle3D( [.5,0,0, 0,.5,1, 0,0,1 ]);
        
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);

        //top
        drawTriangle3D( [.5,0,0, 0,.5,1, 1,.5,1 ]);

        //back
        drawTriangle3D( [0,0,1, 1,.5,1, 1,0,1 ]);
        drawTriangle3D( [0,0,1, 0,.5,1, 1,.5,1 ]);


        
    }
}