import bpy, sys
S=sys.argv[1]
bpy.ops.wm.open_mainfile(filepath=S+'/char/rigged.blend')
for img in bpy.data.images:
    if img.size[0]>1024: img.scale(1024,1024)
arm=bpy.data.objects['Rig']; arm.animation_data.action=None
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=S+'/char/gabriel.glb', export_format='GLB', export_animation_mode='ACTIONS',
    export_image_format='JPEG', export_jpeg_quality=82, export_optimize_animation_size=True, export_force_sampling=True, export_frame_step=2)
