class Camera{
    constructor(){
        this.eye = new Vector([0,0,3]);
        this.at = new Vector([0,0,-100]);
        this.up = new Vector([0,1,0]);
    }

forward() {
    let f = new Vector();
    f.set(this.at);
    f.sub(this.eye);
    f.div(f.magnitude());
    this.at.add(f);
    this.eye.add(f);
}

back() {
    let f = new Vector();
    f.set(this.eye);
    f.sub(this.at);
    f.div(f.magnitude());
    this.at.add(f);
    this.eye.add(f);
}

right(){
    let f = new Vector();
    f.set(this.eye);
    f.sub(this.at);
    f.div(f.magnitude());
    
    let s = Vector.cross(f, this.up);
    s.div(s.magnitude());

    this.at.add(s);
    this.eye.add(s);
}

left(){
    let f = new Vector();
    f.set(this.at);
    f.sub(this.eye);
    f.div(f.magnitude());
    
    let s = Vector.cross(f, this.up);
    s.div(s.magnitude());

    this.at.add(s);
    this.eye.add(s);

}

turnLeft(){
    let f = new Vector();
    f.set(this.at);
    f.sub(this.eye);
    
    let m = new Matrix4();
    m.rotate(5,this.up.elements[0],this.up.elements[1],this.up.elements[2])
    let f_v = new Vector3(f.elements);
    let f_prime = m.multiplyVector3(f_v);
    
    this.at.set(this.eye);
    this.at.add(f_prime);

}

turnRight(){
    let f = new Vector();
    f.set(this.at);
    f.sub(this.eye);
    
    let m = new Matrix4();
    m.rotate(-5,this.up.elements[0],this.up.elements[1],this.up.elements[2])
    let f_v = new Vector3(f.elements);
    let f_prime = m.multiplyVector3(f_v);
    
    this.at.set(this.eye);
    this.at.add(f_prime);
}
}



