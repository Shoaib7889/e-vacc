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
        // if(response.data.docs.length > 0){
        //   var newPass = await md5(await uuidv4())
        //   // var newPass = await md5("12341234")
        //   console.log(newPass)
        //   response.data.docs[0].password = newPass
        //   axios.put(`${COUCHDB_BASE_URL}/e-vaccination/${response.data.docs[0]._id}`,
        //     response.data.docs[0]
        //   ,{
        //     headers: headers
        //   }).then((resp)=>{
        //     if(resp.data.ok){
        //       Alert.alert(
        //         "Success!",
        //         "Password Reset instructions have been sent to your email.",
        //         [
        //           {
        //             text: "Continue",
        //             onPress: () => {
        //               navigation.navigate("Login");
        //             }
        //           }
        //         ],
        //         { cancelable: false }
        //       );
        //     }
        //     else{
        //       Alert.alert(
        //         "Error!",
        //         "Some Error Occured. Please Try Again.",
        //         [
        //           {
        //             text: "Retry",
        //             onPress: () => console.log("Retry Pressed"),
        //             style: "cancel"
        //           }
        //         ],
        //         { cancelable: true }
        //       );
        //     }
        //   }).catch(e=>{
        //     Alert.alert(
        //       "Error!",
        //       "Some Error Occured. Please Try Again.",
        //       [
        //         {
        //           text: "Retry",
        //           onPress: () => console.log("Retry Pressed"),
        //           style: "cancel"
        //         }
        //       ],
        //       { cancelable: true }
        //     );
        //   }) 
        // }
        // else{
        //   Alert.alert(
        //     "Error!",
        //     "Your email is not registered with the E-vaccination system.",
        //     [
        //       {
        //         text: "Retry",
        //         onPress: () => console.log("Retry Pressed"),
        //         style: "cancel"
        //       }
        //     ],
        //     { cancelable: true }
        //   );
        // }
      }).catch(e=>{
        console.log("Fdsa")
        // alert('ok')
      })
    
