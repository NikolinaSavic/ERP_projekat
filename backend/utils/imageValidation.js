const imageValidate = (images) => {
    let imagesToUpload = []
    if (Array.isArray(images)) {
        imagesToUpload = images
    } else {
        imagesToUpload.push(images)
    }

    if (imagesToUpload.length > 3) {
        return { error: "Send only 3 images at once!" }
    }

    for (let image of imagesToUpload) {
        const fileTypes = /jpg|jpeg|png/
        const mimeType = fileTypes.test(image.mimeType)
        if (!mimeType) {
            return { error: "Incorect mime type (should be jpg, jpeg or png)" }
        }
    }

    return { error: false }
}

module.exports = imageValidate