module.exports = (router, pool) => {
  // Get all albums!!!
  router.get("/api/albums", (req, res) => {
    const sql = "SELECT * FROM albums";
    pool.getConnection(function(err, conn) {
      if (err) {
        conn.release();
        console.log(`Error in connection database`);
        return;
      }
      // Use the connection
      conn.query(sql, function(err, results) {
        conn.release();
        if (err) {
          return console.log(`Error in connection database`);
        }
        return res.send({ albums: results });
      });
    });

    /** mysql pool 사용전 코드
    connection.query(sql, (error, results, field) => {
      if (error) console.error(error);
      return res.send({ albums: results });
    });
    **/
  });
  // Get Single Album!!!
  router.get("/api/albums/:id", (req, res) => {
    const sql1 = `SELECT * FROM albums WHERE (a_id = '${req.params.id}')`;
    const sql2 = `SELECT * FROM album WHERE (album_id = '${req.params.id}')`;

    pool.getConnection(function(err, conn) {
      if (err) {
        conn.release();
        console.log(`Error in connection database`);
        return;
      }
      const query1 = params =>
        new Promise(function(resolve, reject) {
          conn.query(sql1, function(err, results) {
            params.album = results;
            resolve(params);
          });
        });
      const query2 = params =>
        new Promise(function(resolve, reject) {
          conn.query(sql2, function(err, results) {
            params.tracks = results;
            resolve(params);
          });
        });
      query1({})
        .then(query2)
        .then(result => {
          conn.release();
          return res.send(result);
        })
        .catch(err => {
          conn.release();
          console.log(err);
        });
    });

    /** mysql pool 사용전 코드
    connection.query(sql1, (error, results, field) => {
      if (error) console.error(error);
      let album = results;
      connection.query(sql2, (error, results, field) => {
        if (error) console.error(error);
        let tracks = results;
        return res.send({
          album,
          tracks
        });
      });
    });
    **/
  });
  router.post("/api/albums/search", (req, res) => {
    const sql = `SELECT * FROM albums WHERE artist_name LIKE "%${
      req.body.artist
    }%"`;

    pool.getConnection(function(err, conn) {
      if (err) {
        conn.release();
        console.log(`Error in connection database`);
        return;
      }
      // Use the connection
      conn.query(sql, function(err, results) {
        conn.release();
        if (err) {
          return console.log(`Error in connection database`);
        }
        return res.send({ albums: results });
      });
    });

    /** mysql pool 사용전 코드
    connection.query(sql, (error, results, field) => {
      if (error) console.error(error);
      return res.send({ albums: results });
    });
    **/
  });
  // Get tracks in Album!!! <= NOT USED
  // router.get("/api/album_tracks/:id", (req, res) => {
  //   const sql = `SELECT * FROM album WHERE (album_id = '${req.params.id}')`;
  //   connection.query(sql, (error, results, field) => {
  //     if (error) console.error(error);
  //     return res.send({ albums: results });
  //   });
  // });
  // Post Search Artistname in Albums
};
