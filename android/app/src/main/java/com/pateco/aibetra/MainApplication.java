package com.pateco.aibetra;

import cl.json.BuildConfig;
import cl.json.ShareApplication;
import android.app.Application;
import cl.json.RNSharePackage;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.nikolaiwarner.RNTextInputReset.RNTextInputResetPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.nikolaiwarner.RNTextInputReset.RNTextInputResetPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }


        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNAccountKitPackage(),
            new FastImageViewPackage(),
                    new VectorIconsPackage(),
                    new PickerPackage(),
                    new RNTextInputResetPackage(),
                    new FIRMessagingPackage(),
                    new FBSDKPackage(mCallbackManager),
                   new RNSharePackage()
            );
        }


        protected String getJSMainModuleName() {
            return "index";
        }
    };


    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }


    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        AppEventsLogger.activateApp(this);
    }

         public String getFileProviderAuthority() {
                return "com.pateco.aibetra.provider";
         }
}
