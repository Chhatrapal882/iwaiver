const Waiver = require('../models/waiver')

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.addwaiver = (req, res) => {
    const { waivername, description } = req.body
    let errors = [];

    if (!waivername) {
        errors.push({ waivername: "required" });
    }

    if (!description) {
        errors.push({ phone: "required" });
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    const waiver = new Waiver({
        waivername: waivername,
        description:description
      });
      waiver.save().then(response=>{
            res.json({msg:response})
      })

  
    

}