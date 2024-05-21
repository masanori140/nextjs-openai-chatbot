import { App } from "cdktf"

import { VpcStack } from "./src/stacks"

const app = new App()
new VpcStack(app, "vpc-stack")
app.synth()
