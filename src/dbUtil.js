const token = Buffer.from(`${"admin"}:${"password"}`, 'utf8').toString('base64')
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${token}`,
      }
 
        const uid = uuid();
      axios.put(`${COUCHDB_BASE_URL}/e-vaccination/${uid}`, {
        'name': name,
        'email': email,
        'password': password,
        'address': address,
        'contact': contact,
        
      },{
        headers: headers
      }).then(async response=>{
          console.log(response.data)
          return;
      }).catch(e=>{
        console.log("something went wrong")
      })
    
