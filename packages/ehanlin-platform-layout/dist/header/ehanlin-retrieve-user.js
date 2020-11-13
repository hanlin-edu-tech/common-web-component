import {
  jQueryNoConflict
} from './jquery-no-conflict'

let ajaxUtil = (type, url, data) => {
  if (type !== 'GET') {
    if (data) {
      data = JSON.stringify(data)
    }
  }

  return jQueryNoConflict.ajax({
    type: type,
    cache: false,
    crossDomain: true,
    url: url,
    data: data,
    contentType: 'application/json; charset=UTF-8',
    dataType: 'json'
  })
}

let onLogOut = () => {
  jQueryNoConflict('#logoutButton').on('click', () => {
      fetch(`/user-bg/member-center/logout`,{
        method: "PUT",
        headers: { "content-type": "application/json"},
      }).then(res => {
        if(res.ok) {
          window.location.href = res.headers.get("Location");
        }
      }).catch(err => {
        console.log(err)
      })
    })
}

let logIn = () => {
  let success = data => {
    let userId = data['id']
    let studentCard = data['studentCard']
    let name = data.name
    let userInfoHtml = `<a href='/app/member-center/user-setting.html'> ${studentCard} &nbsp; ${name} </a>
        <span style='color:#767676'> | </span>
        <li><a id='logoutButton'> 登出 </a></li>
        <span style='color:#767676'> | </span>`

    jQueryNoConflict('#loginSuccess').append(userInfoHtml)
    jQueryNoConflict('#loginBotton').remove()
    jQueryNoConflict('#register').remove()
    onLogOut()
  }
  let error = () => {
    jQueryNoConflict('ul.header-menu').removeAttr('style')
  }

  ajaxUtil('GET', '/ms-user-status/userStatus')
    .then(success, error)
    .then(() => {
      jQueryNoConflict('ul.header-menu').removeAttr('style')
    })
}

export {
  jQueryNoConflict
}
export {
  logIn
}
