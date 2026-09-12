plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.luckynate.phylogene"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.luckynate.phylogene"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }

    sourceSets {
        getByName("main") {
            assets.srcDir(layout.buildDirectory.dir("generated/webAssets"))
        }
    }
}

kotlin {
    jvmToolchain(17)
}

val syncWebAssets by tasks.registering(Sync::class) {
    into(layout.buildDirectory.dir("generated/webAssets"))

    from(rootProject.file("index.html"))
    from(rootProject.file("css")) {
        into("css")
    }
    from(rootProject.file("js")) {
        into("js")
    }
    from(rootProject.file("assets")) {
        into("assets")
    }
}

tasks.named("preBuild") {
    dependsOn(syncWebAssets)
}
