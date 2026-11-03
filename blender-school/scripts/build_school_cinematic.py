import bpy
import math
import sys
import os
from mathutils import Vector

# =====================================================
# MADRASATI - Photorealistic School Environment
# Blender Cycles / Procedural Architecture
# =====================================================

args = sys.argv
hdri_path = None

if "--" in args:
    extra = args[args.index("--") + 1:]
    if extra:
        hdri_path = extra[0]

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)

for block in bpy.data.materials:
    bpy.data.materials.remove(block)

# ---------------- MATERIALS ----------------

def material(name, color, roughness=0.7, metallic=0.0,
             texture=False):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True

    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    bsdf = nodes.get("Principled BSDF")

    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic

    if texture:
        noise = nodes.new("ShaderNodeTexNoise")
        noise.inputs["Scale"].default_value = 38
        noise.inputs["Detail"].default_value = 4
        noise.inputs["Roughness"].default_value = 0.75

        bump = nodes.new("ShaderNodeBump")
        bump.inputs["Strength"].default_value = 0.16
        bump.inputs["Distance"].default_value = 0.035

        links.new(noise.outputs["Fac"], bump.inputs["Height"])
        links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    return mat

concrete = material("Warm architectural concrete", (0.62, 0.59, 0.52), texture=True)
stone = material("Natural limestone", (0.76, 0.72, 0.63), texture=True)
dark = material("Graphite aluminium", (0.055, 0.075, 0.09), 0.28, 0.65)
glass = material("Reflective blue glass", (0.055, 0.17, 0.23), 0.12, 0.72)
gold = material("Champagne metal", (0.63, 0.43, 0.19), 0.27, 0.75)
asphalt = material("Road asphalt", (0.075, 0.085, 0.09), texture=True)
paving = material("Paving stone", (0.39, 0.38, 0.34), texture=True)
grass = material("Landscape grass", (0.095, 0.19, 0.085), texture=True)
wood = material("Tree bark", (0.17, 0.095, 0.045), texture=True)
leaf = material("Deep green foliage", (0.055, 0.17, 0.075), texture=True)
yellow = material("School bus yellow", (0.95, 0.55, 0.035), 0.3)
rubber = material("Tyre rubber", (0.018, 0.02, 0.022), 0.9)
white = material("Warm white paint", (0.88, 0.86, 0.78), 0.35)

# ---------------- GEOMETRY HELPERS ----------------

def cube(name, location, scale, mat, bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    if mat:
        obj.data.materials.append(mat)

    if bevel:
        mod = obj.modifiers.new("Precision softened edges", "BEVEL")
        mod.width = bevel
        mod.segments = 3
        obj.modifiers.new("Weighted corner normals", "WEIGHTED_NORMAL")

    return obj


def cylinder(name, location, radius, depth, mat, vertices=32):
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=vertices, radius=radius, depth=depth,
        location=location
    )
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    return obj


def sphere(name, location, scale, mat):
    bpy.ops.mesh.primitive_ico_sphere_add(
        subdivisions=3, radius=1, location=location
    )
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    obj.data.materials.append(mat)
    return obj


# ---------------- SCHOOL BUILDING ----------------

# Main structure
cube("Main school structure", (0, 0, 7), (34, 17, 14), concrete, 0.18)

# Architectural floor bands
for z in (4.7, 9.2, 13.65):
    cube("Horizontal facade architectural band",
         (0, -8.63, z), (34.3, 0.32, 0.22), gold, 0.035)

# Stone entrance feature
cube("Entrance stone portal", (0, -8.85, 3.5),
     (8.2, 0.65, 7.0), stone, 0.12)

# Entrance glazing and door frames
cube("Main entrance glass", (0, -9.22, 3.1),
     (5.0, 0.12, 5.6), glass, 0.035)

for x in (-2.55, 0, 2.55):
    cube("Entrance aluminium mullion",
         (x, -9.32, 3.1), (0.09, 0.12, 5.7), dark)

cube("Entrance horizontal frame", (0, -9.33, 3.3),
     (5.1, 0.13, 0.1), gold)

# Three floors of realistic window modules
for z in (3.0, 7.5, 12.0):
    for x in (-13, -9, -5, 5, 9, 13):
        cube("Window recessed dark frame",
             (x, -8.68, z), (2.75, 0.22, 2.65), dark, 0.035)

        cube("Reflective window glazing",
             (x, -8.82, z), (2.49, 0.055, 2.38), glass, 0.018)

        cube("Window vertical mullion",
             (x, -8.87, z), (0.055, 0.06, 2.4), gold)

        cube("Window horizontal mullion",
             (x, -8.87, z), (2.5, 0.06, 0.055), gold)

# Roof edge and canopy
cube("Roof crown", (0, 0, 14.15), (35, 18, 0.65), dark, 0.12)
cube("Entrance floating canopy", (0, -10.3, 7.0),
     (10.5, 3.0, 0.32), dark, 0.12)

for x in (-4.5, 4.5):
    cube("Canopy support column", (x, -10.3, 3.5),
         (0.3, 0.35, 7), gold, 0.06)

# Entrance stairs
for i in range(5):
    cube("Wide entrance step",
         (0, -10.3 - i * 0.65, 0.25 + i * 0.25),
         (9, 0.9, 0.45), stone, 0.045)

# Architectural side fins
for x in (-16.5, 16.5):
    cube("Facade vertical architectural fin",
         (x, -8.9, 7), (0.45, 0.55, 14), dark, 0.06)

# ---------------- GROUND AND LANDSCAPE ----------------

cube("Large landscape ground", (0, 0, -0.35),
     (180, 150, 0.5), grass)

cube("School forecourt paving", (0, -20, -0.04),
     (65, 25, 0.25), paving, 0.08)

cube("Front access road", (0, -39, -0.12),
     (100, 12, 0.2), asphalt, 0.04)

# Pavement joints
for x in range(-30, 31, 3):
    cube("Paving joint", (x, -20, 0.095),
         (0.025, 24, 0.008), dark)

# Trees
def create_tree(x, y, height):
    cylinder("Tree trunk", (x, y, height * 0.35),
             0.25, height * 0.7, wood, 16)

    sphere("Tree crown lower", (x, y, height * 0.83),
           (1.55, 1.45, 1.65), leaf)

    sphere("Tree crown upper", (x + 0.45, y, height * 1.12),
           (1.15, 1.2, 1.35), leaf)

for x, y, h in (
    (-23, -5, 6), (-20, -15, 5),
    (23, -5, 6), (20, -15, 5),
    (-24, 8, 6), (24, 8, 6)
):
    create_tree(x, y, h)

# Landscape planter boxes
for x in (-19, 19):
    cube("Stone landscape planter", (x, -13, 0.55),
         (5, 2.0, 1.1), stone, 0.12)

# ---------------- SCHOOL BUS ----------------

# Bus body: front faces toward camera (-Y)
bx, by = 12, -24

cube("School bus lower body", (bx, by, 1.65),
     (3.6, 8.5, 2.6), yellow, 0.35)

cube("School bus upper body", (bx, by, 3.05),
     (3.55, 7.9, 1.25), yellow, 0.25)

# Bus front windscreen
cube("Bus front windshield", (bx, by - 4.29, 3.1),
     (3.0, 0.08, 1.0), glass, 0.08)

# Side windows
for y in (-2.7, -0.7, 1.3, 3.1):
    cube("Bus side window", (bx + 1.83, by + y, 3.1),
         (0.07, 1.55, 0.85), glass, 0.055)

# Bus wheels
for y in (-2.8, 2.8):
    for x in (-1.85, 1.85):
        wheel = cylinder("Bus tyre", (bx + x, by + y, 0.9),
                         0.68, 0.32, rubber)
        wheel.rotation_euler[1] = math.pi / 2

        hub = cylinder("Bus wheel hub",
                       (bx + x * 1.09, by + y, 0.9),
                       0.29, 0.04, gold, 32)
        hub.rotation_euler[1] = math.pi / 2

# Headlights
for x in (-1.15, 1.15):
    sphere("Bus headlight", (bx + x, by - 4.38, 1.45),
           (0.27, 0.09, 0.22), white)

# Bus bumper
cube("Bus front bumper", (bx, by - 4.4, 1.0),
     (3.3, 0.25, 0.25), dark, 0.08)


# =====================================================
# MADRASATI V2 ARCHITECTURAL DETAILS
# =====================================================

trim = material("Facade premium limestone trim", (0.82, 0.78, 0.68), 0.48)
window_dark = material("Window frame satin charcoal", (0.025, 0.04, 0.05), 0.24, 0.55)
bus_chrome = material("Bus polished chrome", (0.58, 0.62, 0.65), 0.2, 0.82)
bus_black = material("Bus grille black", (0.012, 0.018, 0.022), 0.48)
bus_signal = material("Amber signal lights", (1.0, 0.32, 0.025), 0.24)
road_paint = material("Road marking ivory", (0.88, 0.84, 0.7), 0.75)

# Detailed window surrounds and stone sills
for z in (3.0, 7.5, 12.0):
    for x in (-13, -9, -5, 5, 9, 13):
        cube("V2 window left stone reveal",
             (x - 1.43, -8.91, z), (0.09, 0.16, 2.82), trim, 0.025)
        cube("V2 window right stone reveal",
             (x + 1.43, -8.91, z), (0.09, 0.16, 2.82), trim, 0.025)
        cube("V2 window upper lintel",
             (x, -8.91, z + 1.40), (2.95, 0.16, 0.10), trim, 0.025)
        cube("V2 window stone sill",
             (x, -8.98, z - 1.39), (2.98, 0.24, 0.14), stone, 0.035)

# Subtle facade pilasters between window bays
for x in (-15.0, -11.0, -7.0, -3.0, 3.0, 7.0, 11.0, 15.0):
    cube("V2 facade vertical stone pilaster",
         (x, -8.67, 7.0), (0.16, 0.18, 13.4), trim, 0.035)

# Entrance sign panel and dimensional lettering
cube("V2 school identity sign backing",
     (0, -9.30, 8.15), (7.8, 0.24, 1.05), dark, 0.10)

bpy.ops.object.text_add(location=(0, -9.445, 7.94))
sign = bpy.context.object
sign.name = "V2 MADRASATI dimensional sign"
sign.data.body = "MADRASATI SCHOOL"
sign.data.align_x = "CENTER"
sign.data.align_y = "CENTER"
sign.data.size = 0.48
sign.data.extrude = 0.008
sign.data.bevel_depth = 0.002
sign.data.materials.append(trim)
sign.rotation_euler = (math.radians(90), 0, 0)

# Entrance glass door divisions and handles
for x in (-0.82, 0.82):
    cube("V2 entrance door handle",
         (x, -9.39, 2.45), (0.055, 0.055, 0.72), bus_chrome, 0.025)

# Bus front grille, chrome bars and additional lamps
cube("V2 bus front grille surround",
     (bx, by - 4.39, 1.85), (1.72, 0.12, 0.62), bus_chrome, 0.07)
cube("V2 bus grille inset",
     (bx, by - 4.465, 1.85), (1.52, 0.035, 0.44), bus_black, 0.025)

for z in (1.68, 1.79, 1.90, 2.01):
    cube("V2 bus grille horizontal chrome slat",
         (bx, by - 4.49, z), (1.42, 0.025, 0.025), bus_chrome, 0.009)

for x in (-1.45, 1.45):
    sphere("V2 bus amber indicator",
           (bx + x, by - 4.40, 2.35), (0.14, 0.07, 0.10), bus_signal)
    sphere("V2 bus roof marker light",
           (bx + x, by - 4.02, 3.72), (0.12, 0.09, 0.10), bus_signal)

# Bus side safety stripe and lower trim
cube("V2 bus side safety stripe",
     (bx + 1.855, by, 2.25), (0.045, 7.45, 0.12), bus_black, 0.018)
cube("V2 bus lower side chrome trim",
     (bx + 1.86, by, 1.05), (0.055, 7.5, 0.075), bus_chrome, 0.02)

# Bus mirrors with support arms
for side in (-1, 1):
    cube("V2 bus mirror support",
         (bx + side * 1.95, by - 3.65, 3.15),
         (0.10, 0.48, 0.10), bus_black, 0.035)
    cube("V2 bus side mirror",
         (bx + side * 2.02, by - 3.88, 3.28),
         (0.16, 0.14, 0.38), bus_chrome, 0.055)

# Raised tyre sidewall rings
for x in (-1.85, 1.85):
    for y in (-2.8, 2.8):
        bpy.ops.mesh.primitive_torus_add(
            major_radius=0.53,
            minor_radius=0.075,
            major_segments=48,
            minor_segments=12,
            location=(bx + x * 1.10, by + y, 0.9),
            rotation=(0, math.radians(90), 0)
        )
        ring = bpy.context.object
        ring.name = "V2 bus tyre sidewall detail"
        ring.data.materials.append(bus_black)

# Forecourt parking bay markings
for x in (-24, -16, -8, 0, 8, 16, 24):
    cube("V2 parking bay line",
         (x, -22.5, 0.105), (0.075, 5.5, 0.018), road_paint, 0.008)

# Road center markings
for y in (-35, -39, -43):
    cube("V2 road dashed center marking",
         (0, y, 0.005), (5.0, 0.13, 0.018), road_paint, 0.015)

# =====================================================
# END MADRASATI V2 ARCHITECTURAL DETAILS
# =====================================================

# ---------------- LIGHTING / HDRI ----------------

world = bpy.data.worlds.new("Real world sky") if not bpy.data.worlds else bpy.data.worlds[0]
bpy.context.scene.world = world
world.use_nodes = True

nodes = world.node_tree.nodes
links = world.node_tree.links
nodes.clear()

output = nodes.new("ShaderNodeOutputWorld")
background = nodes.new("ShaderNodeBackground")

if hdri_path:
    env = nodes.new("ShaderNodeTexEnvironment")
    env.image = bpy.data.images.load(hdri_path, check_existing=True)
    links.new(env.outputs["Color"], background.inputs["Color"])
    background.inputs["Strength"].default_value = 0.65
else:
    background.inputs["Color"].default_value = (0.22, 0.3, 0.42, 1)
    background.inputs["Strength"].default_value = 0.5

links.new(background.outputs["Background"], output.inputs["Surface"])

bpy.ops.object.light_add(type="SUN", location=(-25, -30, 35))
sun = bpy.context.object
sun.name = "Cinematic afternoon sunlight"
sun.data.energy = 3.0
sun.data.angle = math.radians(18)
sun.rotation_euler = (math.radians(25), math.radians(-28), math.radians(-32))


# ---------------- CINEMATIC ANIMATED CAMERA ----------------
bpy.ops.object.camera_add(location=(43, -64, 30))
camera = bpy.context.object
camera.name = "Madrasati Cinematic Camera"
camera.data.lens = 48
camera.rotation_mode = "XYZ"
bpy.context.scene.camera = camera

target = Vector((0, -5, 5))

def animate_camera(frame, location, lens):
    camera.location = location
    direction = target - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    camera.data.lens = lens

    camera.keyframe_insert(data_path="location", frame=frame)
    camera.keyframe_insert(data_path="rotation_euler", frame=frame)
    camera.data.keyframe_insert(data_path="lens", frame=frame)

animate_camera(1, (43, -64, 30), 48)
animate_camera(120, (35, -52, 25), 52)

for obj in (camera, camera.data):
    if obj.animation_data and obj.animation_data.action:
        for fc in obj.animation_data.action.fcurves:
            for key in fc.keyframe_points:
                key.interpolation = "BEZIER"


# ---------------- CINEMATIC VIDEO SETTINGS ----------------
scene = bpy.context.scene
# Fast cinematic rendering: Eevee / Eevee Next
if bpy.app.version >= (4, 2, 0):
    scene.render.engine = "BLENDER_EEVEE_NEXT"
else:
    scene.render.engine = "BLENDER_EEVEE"

if hasattr(scene, "eevee") and hasattr(scene.eevee, "taa_render_samples"):
    scene.eevee.taa_render_samples = 32

scene.render.resolution_x = 1080
scene.render.resolution_y = 1350
scene.render.resolution_percentage = 80

scene.frame_start = 1
scene.frame_end = 120
scene.frame_step = 1  # Temporary 3-frame quality test
scene.render.fps = 24

scene.render.image_settings.file_format = "FFMPEG"
scene.render.ffmpeg.format = "MPEG4"
scene.render.ffmpeg.codec = "H264"
scene.render.ffmpeg.constant_rate_factor = "MEDIUM"
scene.render.ffmpeg.ffmpeg_preset = "GOOD"

output_dir = os.path.join(os.getcwd(), "output")
os.makedirs(output_dir, exist_ok=True)
scene.render.filepath = os.path.join(
    output_dir, "madrasati-school-cinematic-v1.mp4"
)

scene.view_settings.view_transform = "AgX"
scene.render.film_transparent = False

# Save project and render
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(output_dir, "madrasati-school.blend"))
bpy.ops.render.render(animation=True)

print("MADRASATI BLENDER SCENE COMPLETE")
