import { clone } from '@/fn'
const map = {}

const detail = {
  account: { username: '', password: '' },
}

createMap()
function createMap() {
  Object.keys(detail).map(k => {
    map[k] = () => clone(detail[k])
  })
}
export default map
