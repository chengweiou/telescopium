import { clone } from '@/fn'
const map = {}
export default map
const detail = {
}

createMap()
function createMap() {
  Object.keys(detail).map(k => {
    map[k] = () => clone(detail[k])
  })
}
