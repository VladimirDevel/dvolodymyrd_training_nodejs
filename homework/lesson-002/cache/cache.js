function CacheException(message) {
    this.message = message;
    this.name = "CacheException";
}

var ObjectCache = function Cache () {
    this.storage = {};
    this.set = function(key, value) {
        return this.storage[key] = value;
    };
    this.get = function(key) {
        if (this.has(key)) {
            return this.storage[key];
        }
        throw new CacheException("Object not found, and cannot be returned");
    };
    this.has = function(key) {
        return key in this.storage;
    };
    this.remove = function(keys) {
        var removed = [];
        var notFound = [];
        var exceptionRemoving = [];
        keys.forEach(function(key) {
            if (this.has(key)) {
                try {
                    delete this.storage[key];
                    removed.push(key);
                    return;
                }
                catch(err) {
                    console.log(err);
                    exceptionRemoving.push(key);
                    return;
                }
            }
            notFound.push(key)
        }, this);
        return {"removed": removed, "exceptionRemoving": exceptionRemoving,"notFound":  notFound}
    };
};


