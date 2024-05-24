const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

const scheme_model = require("./schemeModel");

const corsOptions = {
  origin: "http://10.23.124.59:8080/",
  methods: "GET,POST",
  allowHeaders: "*",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://10.194.92.117:3000"); //server ip
  // res.setHeader("Access-Control-Allow-Origin", "http://10.25.53.135:3000");
  // res.setHeader('Access-Control-Allow-Origin', 'http://10.23.124.59:8080');
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", async (req, res) => {
  try {
    if (req.query.sectorCode) {
      const sectorCode = req.query.sectorCode;
      const schemes = await scheme_model.getSchemesById(sectorCode);
      res.status(200).send(schemes);
    } else {
      const schemes = await scheme_model.getSchemes();
      res.status(200).send(schemes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// app.get('/', async (req, res) => {
//   try {
//     const { sectorCode } = req.query;

//     if (sectorCode) {
//         const schemes = await scheme_model.getSchemesById(sectorCode);
//         res.status(200).send(schemes);
//     }
//     else {
//       const schemes = await scheme_model.getSchemes();
//       res.status(200).send(schemes);
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.get("/ministries", async (req, res) => {
  try {
    const { ministryid, dept_code, dist_code, sectorCode } = req.query; // Destructure query parameters

    if (sectorCode && ministryid) {
      const schemes = await scheme_model.getSchemesBySectorAndMinistry(
        sectorCode,
        ministryid
      );
      res.status(200).send(schemes);
    }
    // else if (ministryid && dept_code) {
    //   const schemes = await scheme_model.getSchemesByMinistryAndDepartment(ministryid, dept_code);
    //   res.status(200).send(schemes);
    //   console.log("aaaaaaaaaaaaaaaaa1", schemes)
    // }
    else if (ministryid && dist_code) {
      const schemes = await scheme_model.getSchemesByStateIdAndDistrict(
        ministryid,
        dist_code
      );
      res.status(200).send(schemes);
    } else if (ministryid) {
      const schemes = await scheme_model.getSchemesByMinistry(ministryid);
      res.status(200).send(schemes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//   http://localhost:3001/dept?dept_code=47
app.get("/dept", async (req, res) => {
  try {
    const { dept_code, state_code, sectorCode, ministryid } = req.query;
    // console.log("ministryid", ministryid)
    // console.log("dept_code", dept_code)
    // console.log("req.query", req.query)

    if (sectorCode && dept_code) {
      const schemes = await scheme_model.getSchemesBySectorAndDepartment(
        sectorCode,
        dept_code
      );
      res.status(200).send(schemes);
    } else if (dept_code && ministryid) {
      const schemes = await scheme_model.getSchemesByMinistryAndDepartment(
        ministryid,
        dept_code
      );
      res.status(200).send(schemes);
      // console.log("aaaaaaaaaaaaaaaaa2", schemes);
    } else if (dept_code && state_code) {
      const schemes = await scheme_model.getSchemesByDepartmentAndState(
        dept_code,
        state_code
      );
      res.status(200).send(schemes);
    } else if (dept_code) {
      const schemes = await scheme_model.getSchemesByDepartment(dept_code);
      res.status(200).send(schemes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//  http://localhost:3001/states?state_code=15&sectorCode=11
app.get("/states", async (req, res) => {
  try {
    const { state_code, sectorCode, dist_code, ministryid } = req.query; // Destructure query parameters
    // console.log("msg=", dept_code)
    if (state_code && sectorCode) {
      // Check if both parameters are present
      const schemes = await scheme_model.getSchemesByStateIdAndSector(
        state_code,
        sectorCode
      );
      res.status(200).send(schemes);
    } else if (ministryid && state_code) {
      const schemes = await scheme_model.getSchemesByMinistryAndState(
        ministryid,
        state_code
      );
      res.status(200).send(schemes);
    } else if (state_code && dist_code) {
      const schemes = await scheme_model.getSchemesByStateIdAndDistrict(
        state_code,
        dist_code
      );
      res.status(200).send(schemes);
    } else if (state_code) {
      const schemes = await scheme_model.getSchemesByStateId(state_code);
      res.status(200).send(schemes);
    } else {
      const schemes = await scheme_model.getStates();
      res.status(200).send(schemes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get('/district', async (req, res) => {
//   const dtcd = req.query.dist_code;
//   scheme_model.getSchemesByDistricts(dtcd)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).send(error);
//     });
// });
app.get("/district", async (req, res) => {
  try {
    const { sectorCode, dist_code } = req.query;
    console.log("sectorCode", sectorCode);
    console.log("dist_code", dist_code);

    if (sectorCode && dist_code) {
      const schemes = await scheme_model.getSchemesBySectorAndDistrict(
        sectorCode,
        dist_code
      );
      res.status(200).send(schemes);
    } else if (dist_code) {
      const schemes = await scheme_model.getSchemesByDistricts(dist_code);
      res.status(200).send(schemes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/mode", async (req, res) => {
  const mode = req.query.port_mode;
  console.log("checking.............");
  scheme_model
    .getSchemesByAPIMode(mode)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

// app.get('/states', async (req, res) => {
//   scheme_model.getStates()
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// });

// app.get("/rawData", async (req, res) => {
//   scheme_model
//     .getAllRawDataFromReplica()
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });
app.get("/rawData", async (req, res) => {
  try {
    const { project_code } = req.query;
    console.log("project_code", project_code);

    if (project_code) {
      const schemes = await scheme_model.getAllRawDataByProject(project_code);
      res.status(200).send(schemes);
      // console.log("aaaaaaaaaaaaaaaaa1", schemes);
    } else {
      const schemes = await scheme_model.getAllRawDataFromReplica();
      res.status(200).send(schemes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// const PORT = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
