set JAVA_HOME=C:\Users\Jelle\.jdks\jbrsdk-17.0.9
set ANDROID_SDK_ROOT=C:\Users\Jelle\AppData\Local\Android\Sdk\

echo %JAVA_HOME%
echo %ANDROID_SDK_ROOT%

start /wait cmd /c ionic cap copy 
electron ./electronmain


