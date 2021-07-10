import paramUtil from './util/paramUtil'
import exceptionUtil from './util/exceptionUtil'

export default class {
  static send(e) {
    let url = `${e.url}`
    let options = { method: e.method, headers: {} }
    e.headerList.forEach(header => {
      options.headers[header.k] = header.v
    })
    let body = {}
    e.paramList.forEach(param => {
      body[param.k] = param.v
    })
    switch(e.method) {
      case 'POST':
        paramUtil.createFormData(body)
        break
      case 'DELETE':
        break
      case 'PUT':
        options.body = e.body
        break
      case 'GET':
        url = `${url}?${paramUtil.createUrlEncode(body)}`
        break
    }
    return this.r(url, options)
  }

  static async r(url, options) {
    options.headers = new Headers(options.headers)
    if (options.body && options.body.constructor === Object) {
      options.body = paramUtil.createUrlEncode(options.body)
      if (!options.headers.get('Content-Type')) {
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded')
      }
    }
    let response = {}
    try {
      response = await fetch(url, options)
    } catch (err) {
      return exceptionUtil.createRest(null, err)
    }
    if (!response.ok) return exceptionUtil.createRest(response.status, response.statusText)
    return response.json()
  }
}
