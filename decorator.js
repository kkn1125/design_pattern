class main {
  test() {
    return "origin";
  }
}

class decorator extends main {
  component;
  constructor(component) {
    super(component);
    console.log(component);
    this.component = component;
  }
  test() {
    return this.component.test();
  }
}

class adeco extends decorator {
  constructor(c) {
    super(c);
  }
  test() {
    return `deco! ${super.test()}`;
  }
}

const deco = new main();
const a = new adeco(deco);
const b = new adeco(a);
console.log(a.test());
console.log(b.test());
