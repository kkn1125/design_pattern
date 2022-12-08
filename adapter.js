class Target {
  request() {
    return "Target: 기본 타겟";
  }
}

class Korean {
  specificReques() {
    return "한국어";
  }
}

class Japanese {
  specificReques() {
    return "日本語";
  }
}

class Adapter extends Target {
  adaptee = null;
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }
  translate() {
    const result = this.adaptee.specificReques();
    return `Adapter Result: ${result}`;
  }
}

const target = new Target();
const korean = new Korean();
const japanes = new Japanese();
const adapter = new Adapter(
  korean
  /* japanes */
);

console.log(adapter.translate());
