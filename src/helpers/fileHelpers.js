import Compressor from "image-compressor.js";

export default {
  convertFiles(files, maxDimension = 500, quality = 0.9) {
    return new Promise((resolve, reject) => {
      const comp = new Compressor();

      const promises = files.map(file => {
        return comp.compress(file, {
          maxWidth: maxDimension,
          maxHeight: maxDimension,
          quality: quality
        });
      });
      Promise.all(promises)
        .then(converted => {
          resolve(converted);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  readAsUrl(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  },
  readArrayAsUrl(files) {
    return new Promise((resolve, reject) => {
      const promises = files.map(file => {
        return this.readAsUrl(file);
      });

      Promise.all(promises)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  addUniqueIds(files) {
    files.forEach(file => {
      if (!file.uniqueId) {
        file.uniqueId = Math.random();
      }
    });
  },
  addOrder(files) {
    files.forEach((file, index) => {
      file.orderNumber = index + 1;
    });
  },
  async addThumbnails(files) {
    // Create small thumbnails, then attach them to the files
    const thumbnails = await this.convertFiles(files, 150, 0.4);
    const fileUrls = await this.readArrayAsUrl(thumbnails);
    files.forEach((file, index) => {
      file.thumbnail = {};
      file.thumbnail.src = fileUrls[index];
      file.thumbnail.size = thumbnails[index].size;
    });
  },
  getImageDimensions(file) {
    return new Promise(resolve => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
    });
  },
  async getImageMetadata(image) {
    const dimensions = await this.getImageDimensions(image);
    return {
      title: image.name,
      width: dimensions.width,
      height: dimensions.height,
      uniqueId: image.uniqueId
    };
  },
  async getImageMetadataArray(images) {
    const promises = await images.map(image => this.getImageMetadata(image));
    return Promise.all(promises);
  }
};
