const
    Sequelize = require('sequelize'),
    env = process.env.NODE_ENV || 'dev',
    config = require(__dirname + '/../config.json')[env],
    sequelize = new Sequelize(config.database, config.username, config.password, config),
    db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

/*
    === Sample table associations ===

    db.Users = require('./user.js')(sequelize, Sequelize);
    db.Documents = require('./document.js')(sequelize, Sequelize);
    db.Annotations = require('./annotation.js')(sequelize, Sequelize);

    db.Annotations.belongsTo(db.Users, { foreignKeyConstraint : true, foreignKey: 'userId' });
    db.Annotations.belongsTo(db.Documents, { foreignKeyConstraint : true, foreignKey: 'documentId' });

    db.Documents.hasMany(db.Annotations, { foreignKeyConstraint: true, foreignKey: "documentId" });
    db.Documents.belongsToMany(db.Users, { through: "UserDocument", foreignKeyConstraint: true, foreignKey: "documentId" });

    db.Users.hasMany(db.Annotations, { foreignKeyConstraint: true, foreignKey: "userId" });
    db.Users.belongsToMany(db.Documents, { through: "UserDocument", foreignKeyConstraint: true, foreignKey: "userId" });




*/