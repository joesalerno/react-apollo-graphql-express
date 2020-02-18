const layers = [
  {name: "layer1", start: 0, end: 5},
  {name: "layer2", start: 1, end: 5},
  {name: "layer3", start: 5, end: 7},
  {name: "layer4", start: 6, end: 7},
  {name: "layer5", start: 8, end: 10},
  {name: "layer6", start: 12, end: 15},
  {name: "layer7", start: 3, end: 4},
]

const layers2 = [
  {name: "layer1", start: 0, end: 8},
  {name: "layer2", start: 1, end: 5},
  {name: "layer3", start: 5, end: 7},
  {name: "layer4", start: 6, end: 7},
  {name: "layer5", start: 5, end: 10},
  {name: "layer6", start: 12, end: 15},
  {name: "layer7", start: 7, end: 4},
  {name: "layer8", start: 0, end: 5},
  {name: "layer9", start: 1, end: 2},
  {name: "layer10", start: 5, end: 7},
  {name: "layer11", start: 6, end: 4},
  {name: "layer12", start: 4, end: 10},
  {name: "layer13", start: 12, end: 15},
  {name: "layer14", start: 3, end: 4},
  {name: "layer15", start: 5, end: 5},
  {name: "layer16", start: 6, end: 5},
  {name: "layer17", start: 5, end: 7},
  {name: "layer18", start: 6, end: 7},
  {name: "layer19", start: 8, end: 10},
  {name: "layer20", start: 2, end: 15},
  {name: "layer21", start: 1, end: 4},
]

const randomLayers = count => {
  let layers = []
  for (let i = 0; i < count; i++) {
    let start = Math.floor(Math.random() * count)
    let end = start + 1 + Math.floor(Math.random() * (count - start - 1))
    layers.push({name:`layer${i}`, start, end})
  }
  return layers
}

const stackLayers = layers => {
  const buildStack = (layers, stack, start = Number.MIN_SAFE_INTEGER) => {
    // Get the layer with first start row after start
    let firstStart = "initial"
    let firstIndex = undefined
    for (const i in layers) {
      if (layers[i].start > start && (firstStart === "initial" || layers[i].start < firstStart)) {
        firstStart = layers[i].start
        firstIndex = i
      }
    }
    // If no layers, done
    if (!firstIndex) return stack
    // Otherwise, push the found layer onto stack and continue this stack until can't add anymore
    stack.push(layers[firstIndex])
    layers.splice(firstIndex, 1)
    return buildStack(layers, stack, (stack[stack.length -1].end))
  }
  // Build stacks until all layers are consumed
  let stacks = []
  while (layers.length) {
    let stack = buildStack(layers, [])
    if (!stack.length) return [] //prevent infinite loops
    stacks.push(stack)
  }
  return stacks
}

console.log(stackLayers(randomLayers(16)))