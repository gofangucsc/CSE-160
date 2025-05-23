class Vector {
    constructor(opt_src) {
        var v = new Float32Array(3);
        if (opt_src && typeof opt_src === 'object') {
          v[0] = opt_src[0];
          v[1] = opt_src[1];
          v[2] = opt_src[2];
        }
        this.elements = v;
    }

    /**
     * Copy vector.
     * @param src source vector
     * @return this
     */
    set(src) {
        var i, s, d;

        s = src.elements;
        d = this.elements;

        if (s === d) {
          return;
        }

        for (i = 0; i < 3; ++i) {
          d[i] = s[i];
        }

        return this;
    }

    /**
      * Add other to this vector.
      * @return this
      */
    add(other) {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.
        var v = this.elements
        var o = other.elements
        for(var i = 0; i < 3; ++i){
          v[i] += o[i];
        }

        // Don't delete the return statement.
        return this;
    };

    /**
      * Subtract other from this vector.
      * @return this
      */
    sub(other) {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.
        var v = this.elements
        var o = other.elements
        for(var i = 0; i < 3; ++i){
          v[i] -= o[i];
        }
        
        // Don't delete the return statement.
        return this;
    };

    /**
      * Divide this vector by a scalar.
      * @return this
      */
    div(scalar) {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.
        if(scalar == 0){
          console.log("div error: cannot divide by zero");
          return;
        }
        var v = this.elements
        for(var i = 0; i < 3; ++i){
          v[i] = v[i] / scalar;
        }

        // Don't delete the return statement.
        return this;
    };

    /**
      * Multiply this vector by a scalar.
      * @return this
      */
    mul(scalar) {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.
        var v = this.elements
        for(var i = 0; i < 3; ++i){
          v[i] = v[i] * scalar;
        }
        
        // Don't delete the return statement.
        return this;
    };

    /**
      * Calcualte the dop product between this vector and other.
      * @return scalar
      */
    static dot(other1, other2) {
        // Insert your code here.
        let d = 0; // Modify this line to calculate this vector's magnitude.
        var v1 = other1.elements
        var v2 = other2.elements
        for(var i = 0; i < 3; ++i){
          d += v1[i] * v2[i];
        }
        
        // Don't delete the return statement.
        return d;
    }

    /**
      * Calcualte the cross product between this vector and other.
      * @return new vector
      */
    static cross(other1, other2) {
        // Insert your code here.
        // This function should create and return a new vector.
        var v1 = other1.elements
        var v2 = other2.elements

        var e1 = (v1[1] * v2[2]) - (v1[2] * v2[1]);
        var e2 = (v1[2] * v2[0]) - (v1[0] * v2[2]);
        var e3 = (v1[0] * v2[1]) - (v1[1] * v2[0])

        let v3 = new Vector([e1, e2, e3]); // Modify this line to calculate cross product between other1 and other2.

        // Don't delete the return statement.
        return v3;
    }

    /**
      * Calculate the magnitude (or length) of this vector.
      * @return scalar
      */
    magnitude() {
        // Insert your code here.
        let m = 0; // Modify this line to calculate this vector's magnitude.
        var v = this.elements;
        for(var i = 0; i < 3; ++i){
          m += v[i] ** 2;
        }

        m = Math.sqrt(m);
        // Don't delete the return statement.
        return m;
    };

    /**
      * Normalize this vector.
      * @return this
      */
    normalize() {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.
        var m = this.magnitude();
        var v = this.elements;
        for(var i = 0; i < 3; ++i){
          v[i] = v[i] / m;
        }

        // Don't delete the return statement.
        return this;
    };
}