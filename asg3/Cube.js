class Cube{
    constructor(){
        this.type='cube';
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
        this.textureNum=-2;
    }

    render(){
        
        var rgba = this.color;

        gl.uniform1i(u_whichTexture, this.textureNum)
        //console.log(this.textureNum);

        //Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        //console.log(u_FragColor);

        //Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
        // Front of cube
        drawTriangle3DUV( [0,0,0, 1,1,0, 1,0,0], [0,0, 1,1, 1,0]);
        //drawTriangle3D( [0,0,0, 1,1,0, 1,0,0 ]);
        drawTriangle3DUV( [0,0,0, 0,1,0, 1,1,0], [0,0, 0,1, 1,1]);

         // Back of Cube
        drawTriangle3DUV( [0,0,1, 1,1,1, 1,0,1 ], [0,0, 1,1, 1,0]);
        drawTriangle3DUV( [0,0,1, 0,1,1, 1,1,1 ], [0,0, 0,1, 1,1]);

        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
        
        // Top of Cube
        drawTriangle3DUV( [0,1,0, 0,1,1, 1,1,1 ], [0,0, 0,1, 1,1]);
        drawTriangle3DUV( [0,1,0, 1,1,1, 1,1,0 ], [0,0, 1,1, 1,0]);

        // Bottom of Cube
        drawTriangle3DUV( [0,0,0, 1,0,1, 1,0,0 ], [0,0, 1,1, 1,0]);
        drawTriangle3DUV( [0,0,0, 0,0,1, 1,0,1 ], [0,0, 0,1, 1,1]);

        // Left Face
        drawTriangle3DUV( [0,0,0, 0,1,1, 0,0,1 ], [1,0, 0,1, 0,0]);
        drawTriangle3DUV( [0,0,0, 0,1,0, 0,1,1 ], [1,0, 1,1, 0,1]);

        // Right Face
        drawTriangle3DUV( [1,0,0, 1,1,1, 1,0,1 ], [0,0, 1,1, 1,0]);
        drawTriangle3DUV( [1,0,0, 1,1,0, 1,1,1 ], [0,0, 0,1, 1,1]);
    }

    renderfast(){
        var rgba = this.color;

        gl.uniform1i(u_whichTexture, this.textureNum)
        //console.log(this.textureNum);

        //Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        //console.log(u_FragColor);

        //Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
        var allverts=[];
        // Front of cube
        allverts=allverts.concat( [0,0,0, 1,1,0, 1,0,0]);
        allverts=allverts.concat( [0,0,0, 0,1,0, 1,1,0]);

         // Back of Cube
        allverts=allverts.concat( [0,0,1, 1,1,1, 1,0,1 ]);
        allverts=allverts.concat( [0,0,1, 0,1,1, 1,1,1 ]);

        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
        
        // Top of Cube
        allverts=allverts.concat( [0,1,0, 0,1,1, 1,1,1 ]);
        allverts=allverts.concat( [0,1,0, 1,1,1, 1,1,0 ]);

        // Bottom of Cube
        allverts=allverts.concat( [0,0,0, 1,0,1, 1,0,0 ]);
        allverts=allverts.concat( [0,0,0, 0,0,1, 1,0,1 ]);
        // Left Face
        allverts=allverts.concat( [0,0,0, 0,1,1, 0,0,1 ]);
        allverts=allverts.concat( [0,0,0, 0,1,0, 0,1,1 ]);

        // Right Face
        allverts=allverts.concat( [1,0,0, 1,1,1, 1,0,1 ]);
        allverts=allverts.concat( [1,0,0, 1,1,0, 1,1,1 ]);
        drawTriangle3D(allverts);
    }


}